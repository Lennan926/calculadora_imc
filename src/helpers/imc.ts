export type Level = {
    title: string;
    color: string;
    icon: 'down' | 'up',
    imc: number[]
    yourImc?: number;
}

export const levels: Level[] = [
    { title: 'Magreza', color: '#96A3AB', icon: 'down', imc: [0, 18.5] },
    { title: 'Normal', color: '#0EAD69', icon: 'up', imc: [18.5, 24.9] }, // <-- Agora começa em 18.5
    { title: 'Sobrepeso', color: '#E2B036', icon: 'down', imc: [25, 30] },
    { title: 'Obesidade', color: '#C3423F', icon: 'down', imc: [30, 99] } // <-- Também ajustado
];

export const calculateImc = (height: number, weight: number) => {
    if (height <= 0 || weight <= 0) return null; // Evita valores inválidos

    const imc = weight / (height * height);

    for (let level of levels) {
        if (imc >= level.imc[0] && imc < level.imc[1]) {  // Agora cobre corretamente
            return { 
                ...level, 
                yourImc: parseFloat(imc.toFixed(2)) // Formata com 2 casas decimais
            };
        }
    }

    return null;
};