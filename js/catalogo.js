import { Indicador } from './Indicador.js';
import { IndicadorDerivado } from './IndicadorDerivado.js';

export const catalogo = [
    //Demografía
    new Indicador("SP.POP.TOTL", "Población total", "Demografía", "Personas"),
    new IndicadorDerivado("NACIMIENTOS", "Nacimientos estimados", "Demografía", "Nacimientos por año (estimación)", "SP.DYN.CBRT.IN"),
    new IndicadorDerivado("DEFUNCIONES", "Defunciones estimadas", "Demografía", "Defunciones por año (estimación)", "SP.DYN.CDRT.IN"),
    new Indicador("SP.DYN.TFRT.IN", "Fecundidad total", "Demografía", "Hijos por mujer"),
    new Indicador("SP.POP.GROW", "Crecimiento de la población", "Demografía", "% anual"),
    new Indicador("SP.URB.TOTL.IN.ZS", "Población urbana", "Demografía", "% de la población total"),

    // Economía
    new Indicador("NY.GDP.MKTP.CD", "PIB", "Economía", "US$ corrientes"),
    new Indicador("NY.GDP.PCAP.CD", "PIB per cápita", "Economía", "US$ corrientes por persona"),
    new Indicador("SL.UEM.TOTL.ZS", "Desempleo total", "Economía", "% de la población activa"),

    // Salud
    new Indicador("SP.DYN.LE00.IN", "Esperanza de vida al nacer", "Salud", "Años"),
    new Indicador("SP.DYN.IMRT.IN", "Mortalidad infantil", "Salud", "Defunciones de menores de 1 año por 1.000 nacidos vivos"),
    new Indicador("SH.MED.BEDS.ZS", "Camas hospitalarias", "Salud", "Camas por 1.000 habitantes"),
    new Indicador("SH.XPD.CHEX.GD.ZS", "Gasto corriente en salud", "Salud", "% del PIB"),

    // Sociedad
    new Indicador("SE.TER.ENRR", "Matrícula terciaria", "Sociedad", "% bruto de matrícula"),
    new Indicador("IT.NET.USER.ZS", "Personas usuarias de Internet", "Sociedad", "% de la población"),
];
