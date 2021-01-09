export const money = (e) => {
    var rupiah = '';
    var angkarev = e
        .toString()
        .split('')
        .reverse()
        .join('');
    for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return (
        'Rp' +
        rupiah
            .split('', rupiah.length - 1)
            .reverse()
            .join('')
    );
}

export const formatDate = (date) => {
    console.log(date, 'inidate')
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const [y, m, d] = date.split('-');
    return `${d} ${monthNames[m - 1]} ${y}`;
}
