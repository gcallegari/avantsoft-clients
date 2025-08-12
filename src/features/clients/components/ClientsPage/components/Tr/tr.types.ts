type LeadersMap = {
  topVolume?: { id: string };
  topAverage?: { id: string };
  topFrequency?: { id: string };
};

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export { BRL, type LeadersMap };
