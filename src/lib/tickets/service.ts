import { TicketType, TicketUpdatePayload } from '../types/ticket';
import fs from 'fs';
import path from 'path';

// Path to the JSON file that will store ticket data
const TICKETS_FILE_PATH = path.join(process.cwd(), 'data', 'tickets.json');

// Ensure the data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Default ticket types if none exist
const defaultTickets: TicketType[] = [
  {
    id: '1',
    name: 'General Admission',
    description: 'Includes full Pacific Island buffet dinner, welcome drink, and cultural performance',
    price: 60,
    order: 1,
    isActive: true
  },
  {
    id: '2',
    name: 'Premium Experience',
    description: 'Includes preferred seating, full Pacific Island buffet dinner, two drinks, and cultural performance',
    price: 60,
    order: 2,
    isActive: false
  },
  {
    id: '3',
    name: 'VIP Royal Experience',
    description: 'Includes front-row seating, full Pacific Island buffet dinner, open bar, traditional greeting, souvenir photo, and cultural performance',
    price: 60,
    order: 3,
    isActive: false
  }
];

// Initialize tickets file if it doesn't exist
const initTicketsFile = () => {
  ensureDataDir();
  if (!fs.existsSync(TICKETS_FILE_PATH)) {
    fs.writeFileSync(TICKETS_FILE_PATH, JSON.stringify(defaultTickets, null, 2));
  }
};

// Get all tickets
export const getAllTickets = (): TicketType[] => {
  try {
    initTicketsFile();
    const ticketsData = fs.readFileSync(TICKETS_FILE_PATH, 'utf-8');
    return JSON.parse(ticketsData);
  } catch (error) {
    console.error('Error reading tickets:', error);
    return defaultTickets;
  }
};

// Get active tickets (for public display)
export const getActiveTickets = (): TicketType[] => {
  const tickets = getAllTickets();
  return tickets
    .filter(ticket => ticket.isActive)
    .sort((a, b) => a.order - b.order);
};

// Get a ticket by ID
export const getTicketById = (id: string): TicketType | null => {
  const tickets = getAllTickets();
  return tickets.find(ticket => ticket.id === id) || null;
};

// Create a new ticket
export const createTicket = (ticketData: Omit<TicketType, 'id'>): TicketType => {
  try {
    // Ensure data directory exists
    ensureDataDir();
    
    // Get existing tickets or initialize with defaults
    let tickets: TicketType[] = [];
    try {
      if (fs.existsSync(TICKETS_FILE_PATH)) {
        const ticketsData = fs.readFileSync(TICKETS_FILE_PATH, 'utf-8');
        tickets = JSON.parse(ticketsData);
      } else {
        tickets = [...defaultTickets];
      }
    } catch (readError) {
      console.error('Error reading tickets file, using defaults:', readError);
      tickets = [...defaultTickets];
    }
    
    const newId = Date.now().toString();
    
    const newTicket: TicketType = {
      id: newId,
      name: ticketData.name,
      description: ticketData.description,
      price: Number(ticketData.price),
      order: Number(ticketData.order),
      isActive: Boolean(ticketData.isActive)
    };
    
    tickets.push(newTicket);
    
    // Write to file with error handling
    try {
      fs.writeFileSync(TICKETS_FILE_PATH, JSON.stringify(tickets, null, 2));
    } catch (writeError) {
      console.error('Error writing tickets file:', writeError);
      throw new Error(`Failed to save ticket: ${writeError instanceof Error ? writeError.message : 'Unknown error'}`);
    }
    
    return newTicket;
  } catch (error) {
    console.error('Error in createTicket:', error);
    throw error;
  }
};

// Update a ticket
export const updateTicket = (id: string, updates: TicketUpdatePayload): TicketType | null => {
  const tickets = getAllTickets();
  const ticketIndex = tickets.findIndex(ticket => ticket.id === id);
  
  if (ticketIndex === -1) {
    return null;
  }
  
  tickets[ticketIndex] = {
    ...tickets[ticketIndex],
    ...updates
  };
  
  fs.writeFileSync(TICKETS_FILE_PATH, JSON.stringify(tickets, null, 2));
  
  return tickets[ticketIndex];
};

// Delete a ticket
export const deleteTicket = (id: string): boolean => {
  const tickets = getAllTickets();
  const filteredTickets = tickets.filter(ticket => ticket.id !== id);
  
  if (filteredTickets.length === tickets.length) {
    return false; // No ticket was removed
  }
  
  fs.writeFileSync(TICKETS_FILE_PATH, JSON.stringify(filteredTickets, null, 2));
  
  return true;
};

// Verify admin access
export const verifyAdminAccess = (secretKey: string): boolean => {
  try {
    // Path to the admin access file
    const ADMIN_ACCESS_FILE_PATH = path.join(process.cwd(), 'data', 'admin-access.json');
    
    // Check if the file exists
    if (!fs.existsSync(ADMIN_ACCESS_FILE_PATH)) {
      console.error('Admin access file not found');
      return false;
    }
    
    // Read the admin access file
    const adminAccessData = JSON.parse(fs.readFileSync(ADMIN_ACCESS_FILE_PATH, 'utf8'));
    
    // Verify the secret key
    return secretKey === adminAccessData.secretKey;
  } catch (error) {
    console.error('Error verifying admin access:', error);
    return false;
  }
};

// Get admin access path
export const getAdminAccessPath = (): string => {
  return process.env.ADMIN_ACCESS_PATH || 'admin';
};
