import { StrictMode } from 'react';
import { it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { PetCard, PetModal } from './App.jsx';
import { pets } from './data/pets.js';

it('opens the same pet once from either the card image or its button', async () => {
 const user = userEvent.setup();
 const select = vi.fn();
 render(<PetCard pet={pets[0]} onSelect={select} />);
 await user.click(screen.getByRole('img'));
 expect(select).toHaveBeenCalledExactlyOnceWith(pets[0]);
 select.mockClear();
 await user.click(screen.getByRole('button'));
 expect(select).toHaveBeenCalledExactlyOnceWith(pets[0]);
});

it('keeps content clicks and drags open, but closes on a backdrop click', async () => {
 const user = userEvent.setup();
 const close = vi.fn();
 const { container } = render(<PetModal pet={pets[0]} onClose={close} />);
 const dialog = screen.getByRole('dialog');
 expect(container).not.toContainElement(dialog);
 expect(dialog.parentElement).toBe(document.body);
 await user.click(screen.getByText(pets[0].description));
 expect(close).not.toHaveBeenCalled();
 fireEvent.pointerDown(screen.getByText(pets[0].description));
 fireEvent.click(dialog);
 expect(close).not.toHaveBeenCalled();
 await user.click(dialog);
 expect(close).toHaveBeenCalledOnce();
});

it('reopens different pets in StrictMode and closes with the native Escape event', async () => {
 window.innerWidth = 1280;
 const user = userEvent.setup();
 render(<StrictMode><App /></StrictMode>);
 for (const pet of pets.slice(0, 2)) {
  await user.click(screen.getByRole('button', { name: `Подробнее о питомце ${pet.name}` }));
  const dialog = screen.getByRole('dialog', { name: pet.name });
  expect(dialog).toHaveAttribute('open');
  expect(screen.getByText(pet.description)).toBeVisible();
  fireEvent(dialog, new Event('cancel', { cancelable: true }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
 }
});

it('shows each pet once across all catalog pages, including the last partial page', async () => {
 window.innerWidth = 1280;
 const user = userEvent.setup();
 const select = vi.fn();
 const { PetGallery } = await import('./App.jsx');
 render(<PetGallery catalog onSelect={select} />);
 const seen = [];
 for (let page = 0; page < Math.ceil(pets.length / 8); page++) {
  const buttons = screen.getAllByRole('button', { name: /^Подробнее о питомце/ });
  for (const button of buttons) {
   await user.click(button);
   seen.push(select.mock.calls.at(-1)[0].name);
  }
  const next = screen.getByRole('button', { name: 'Следующая страница' });
  if (page < Math.ceil(pets.length / 8) - 1) await user.click(next);
  else {
   await user.click(next);
   expect(screen.getByText('1', { selector: '.current-page' })).toBeInTheDocument();
  }
 }
 expect(seen).toEqual(pets.map(pet => pet.name));
 expect(new Set(seen).size).toBe(18);
});
