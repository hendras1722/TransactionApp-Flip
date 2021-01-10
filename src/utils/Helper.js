export const money = (e) => {
    let rupiah = '';
    let angkaChange = String(e).split('').reverse().join('');
    for (let i = 0; i < angkaChange.length; i++)
        if (i % 3 == 0) rupiah += angkaChange.substr(i, 3) + '.';
    return (
        'Rp' +
        rupiah
            .split('', rupiah.length - 1)
            .reverse()
            .join('')
    );
}

export const formatDate = (date) => {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const [y, m, d] = date.split('-');
    return `${d} ${monthNames[m - 1]} ${y}`;
}
