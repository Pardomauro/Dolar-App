import { formatDate } from './formatDate';
import { describe, it, expect } from 'vitest';

// Algunas versiones de Node/ICU usan espacios especiales (U+00A0 / U+202F)
// antes de "a. m." / "p. m.". Los normalizamos para que el test no dependa de eso.
const normalizar = (texto) => texto.replace(/[  ]/g, ' ');

describe('formatDate', () => {
    describe('valores vacíos', () => {
        it('si no hay fecha, devuelve string vacío', () => {
            expect(formatDate()).toBe('');
        });

        it('si la fecha es null, devuelve string vacío', () => {
            expect(formatDate(null)).toBe('');
        });

        it('si la fecha es un string vacío, devuelve string vacío', () => {
            expect(formatDate('')).toBe('');
        });

        // Ojo: 0 es un timestamp válido (01/01/1970), pero como es "falsy"
        // la función devuelve ''. Este test documenta el comportamiento actual.
        it('si la fecha es 0, devuelve string vacío', () => {
            expect(formatDate(0)).toBe('');
        });
    });

    describe('formato', () => {
        it('formatea correctamente la fecha (formato general)', () => {
            const fecha = '2024-06-01T12:34:56Z';
            const resultado = formatDate(fecha);
            expect(resultado).toMatch(/^\d{1,2}\/\d{1,2}\/\d{2}, \d{1,2}:\d{2}/);
        });

        // Sin "Z" la fecha se interpreta en hora local, así el resultado
        // es el mismo sin importar la zona horaria de la máquina / CI.
        it('devuelve la fecha y hora exactas en formato es-AR', () => {
            const resultado = normalizar(formatDate('2024-06-01T12:34:56'));
            expect(resultado).toBe('1/6/24, 12:34 p. m.');
        });

        it('pone el día antes que el mes', () => {
            const resultado = normalizar(formatDate('2024-01-05T09:05:00'));
            expect(resultado).toBe('5/1/24, 9:05 a. m.');
        });

        it('no muestra los segundos', () => {
            const resultado = normalizar(formatDate('2024-06-01T12:34:56'));
            expect(resultado).not.toContain(':56');
        });
    });

    describe('tipos de entrada', () => {
        it('acepta un objeto Date', () => {
            const fecha = new Date(2024, 5, 1, 12, 34); // los meses empiezan en 0 → junio
            expect(normalizar(formatDate(fecha))).toBe('1/6/24, 12:34 p. m.');
        });

        it('acepta un timestamp numérico', () => {
            const timestamp = new Date(2024, 5, 1, 12, 34).getTime();
            expect(normalizar(formatDate(timestamp))).toBe('1/6/24, 12:34 p. m.');
        });

        it('con un string que no es fecha devuelve "Invalid Date"', () => {
            expect(formatDate('fecha-invalida')).toBe('Invalid Date');
        });
    });
});
