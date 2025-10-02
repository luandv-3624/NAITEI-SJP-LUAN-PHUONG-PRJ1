import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { SpaceCard } from '@/features/space/components/space-card';
import { SpaceStatus, Space } from '@/features/space/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-icons/fa6', () => ({
  FaPeopleGroup: () => <span data-testid='fa-people-group' />,
}));

const mockSpace: Space = {
  id: 1,
  name: 'Main Hall A',
  venue_id: 10,
  venue: {
    id: 10,
    name: 'Grand Convention Center',
    address: '123 Main Street, District 1',
    ward: {
      id: 101,
      name: 'Ward 5',
      province: {
        id: 1,
        name: 'Ho Chi Minh City',
      },
    },
  },
  space_type: {
    id: 1,
    name: 'Conference Room',
    description: 'A room suitable for conferences and meetings',
  },
  capacity: 150,
  price_type: {
    id: 1,
    code: 'PER_HOUR',
    name: 'Theo giờ',
    name_en: 'Per Hour',
  },
  price: '500000',
  status: SpaceStatus.AVAILABLE,
  description: 'Spacious, well-lit hall ideal for events or conferences.',
  created_at: '2025-09-20T10:00:00Z',
  updated_at: '2025-09-25T12:00:00Z',
};

describe('SpaceCard', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SpaceCard space={mockSpace} />,
      </MemoryRouter>,
    );
  });

  it('should renders space name and address', () => {
    expect(screen.getByText(/Main Hall A/i)).toBeInTheDocument();
    expect(
      screen.getByText(/123 Main Street Check CI, District 1/i),
    ).toBeInTheDocument();
  });

  it('should renders venue location with ward + province', () => {
    expect(screen.getByText(/Ward 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Ho Chi Minh City/i)).toBeInTheDocument();
  });

  it('should renders capacity badge', () => {
    expect(screen.getByText(/150/)).toBeInTheDocument();
  });

  it('should renders price in English format', () => {
    expect(screen.getByText(/500000 đ\/Per Hour/i)).toBeInTheDocument();
  });

  it('should renders detail link with correct href', () => {
    const detailLink = screen.getByRole('link', { name: /detail/i });
    expect(detailLink).toHaveAttribute('href', '/spaces/1');
  });

  it('should renders image with src', () => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/auth-wall.jpg');
  });
});
