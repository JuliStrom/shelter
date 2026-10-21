import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { PetGallery, PetModal } from './App.jsx';
import { pets } from './data/pets.js';

function resize(width) { window.innerWidth = width; fireEvent(window, new Event('resize')); }

describe('Pets interactions', () => {
  it('cycles the slider in both directions without duplicate cards', async () => {
    resize(1280);
    const user = userEvent.setup();
    render(<PetGallery onSelect={vi.fn()} />);
    const names = () => screen.getAllByRole('article').map(card => card.textContent);
    const initial = names();
    await user.click(screen.getByRole('button', { name: 'Следующие питомцы' }));
    expect(names()).not.toEqual(initial);
    expect(new Set(names()).size).toBe(3);
    await user.click(screen.getByRole('button', { name: 'Предыдущие питомцы' }));
    expect(names()).toEqual(initial);
  });

  it('wraps catalog pagination in both directions and updates page size on resize', async () => {
    resize(1280);
    const user = userEvent.setup();
    render(<PetGallery catalog onSelect={vi.fn()} />);
    expect(screen.getAllByRole('article')).toHaveLength(8);
    expect(screen.getByRole('button', { name: 'Предыдущая страница' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Последняя страница' }));
    expect(screen.getByText('3', { selector: '.current-page' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Следующая страница' }));
    expect(screen.getByText('1', { selector: '.current-page' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(8);
    await user.click(screen.getByRole('button', { name: 'Предыдущая страница' }));
    expect(screen.getByText('3', { selector: '.current-page' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(2);
    resize(390);
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByText('1', { selector: '.current-page' })).toBeInTheDocument();
  });

  it('opens pet details, locks scrolling, closes and restores focus', async () => {
    resize(1280);
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole('button', { name: 'Подробнее о питомце Дженнифер' });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Дженнифер' })).toBeVisible();
    expect(screen.getByText('Собака — Лабрадор')).toBeVisible();
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(screen.getByRole('button', { name: 'Закрыть описание питомца' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(trigger).toHaveFocus();
  });

  it('handles native dialog cancellation', () => {
    const close = vi.fn();
    render(<PetModal pet={pets[4]} onClose={close} />);
    fireEvent(screen.getByRole('dialog'), new Event('cancel'));
    expect(close).toHaveBeenCalledOnce();
  });

  it('closes mobile navigation after selecting a link', async () => {
    resize(390);
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: 'Открыть или закрыть меню' });
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(screen.getByRole('link', { name: 'Контакты' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('resolves every existing pet photograph', () => {
    expect(pets).toHaveLength(18);
    expect(pets.every(pet => typeof pet.img === 'string' && pet.img.includes('pets-'))).toBe(true);
  });
});
