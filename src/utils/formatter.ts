export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	}).format(amount);
};

export const formatDate = (timestamp: string): string => {
	return new Date(timestamp).toLocaleString('id-ID', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};