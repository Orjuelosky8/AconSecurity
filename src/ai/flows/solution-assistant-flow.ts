
'use server';
/**
 * @fileOverview Un asistente de IA que recomienda soluciones de seguridad.
 *
 * - solutionAssistant - Una función que sugiere soluciones basadas en la entrada del usuario.
 * - SolutionAssistantInput - El tipo de entrada para la función solutionAssistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SolutionAssistantInputSchema = z.object({
  solutionType: z.string().describe('El tipo de propiedad que el usuario busca proteger (ej. "mi-empresa", "mi-hogar", "conjunto-residencial").'),
  entityType: z.string().describe('El tipo de servicio de seguridad requerido (ej. "vigilancia-fija", "vigilancia-movil", "escoltas", "seguridad-electronica").'),
  situation: z.string().describe('La situación o problema específico del usuario (ej. "prevenir-robos", "control-accesos", "proteger-transporte").'),
});
export type SolutionAssistantInput = z.infer<typeof SolutionAssistantInputSchema>;

export async function solutionAssistant(input: SolutionAssistantInput): Promise<string> {
  return solutionAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solutionAssistantPrompt',
  input: { schema: SolutionAssistantInputSchema },
  output: { format: 'text' },
  prompt: `
    Eres un asistente virtual experto en seguridad para la empresa "Acon Security", cuyo lema es "Servimos por vocación".
    Tu objetivo es analizar la solicitud del usuario y proporcionar una recomendación clara y útil dentro de una conversación de chat.

    Contexto del usuario:
    - Busca proteger: {{{solutionType}}}
    - Necesita un servicio de: {{{entityType}}}
    - Su objetivo es: {{{situation}}}

    Servicios disponibles que puedes recomendar:
    - Vigilancia Fija
    - Vigilancia Móvil
    - Escolta a Personas
    - Escolta de Mercancías
    - Seguridad Electrónica y Monitoreo 24/7

    Instrucciones de respuesta:
    1. Comienza con un saludo amigable como "¡Hola! Gracias por tu consulta. En Acon Security, servimos por vocación y estamos aquí para ayudarte."
    2. Basado en la información proporcionada, analiza y recomienda 1 o 2 servicios que se ajusten mejor a la necesidad. Sé específico. Por ejemplo, si el objetivo es 'control-accesos' en 'mi-empresa', recomienda 'Vigilancia Fija' y 'Seguridad Electrónica'. Si es 'proteger-transporte', recomienda 'Escolta de Mercancías'.
    3. **MUY IMPORTANTE**: Para cada servicio recomendado, genera un enlace con el atributo 'data-service' que contenga el nombre EXACTO del servicio. Ejemplo: <a href="#" data-service="Vigilancia Fija" class="underline text-primary">Vigilancia Fija</a>.
    4. Después de las recomendaciones, finaliza SIEMPRE con la pregunta exacta: "¿Quieres una personalización más detallada?".
    5. La respuesta debe ser concisa, en un solo bloque de texto. No uses markdown, listas con guiones o numeración. Mantén un tono conversacional y profesional.
  `,
});


const solutionAssistantFlow = ai.defineFlow(
  {
    name: 'solutionAssistantFlow',
    inputSchema: SolutionAssistantInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
