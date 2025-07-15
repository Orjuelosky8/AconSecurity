
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
  solutionType: z.string().describe('El tipo de solución que busca el usuario (ej. "mi-empresa", "mi-hogar").'),
  entityType: z.string().describe('El tipo de servicio de seguridad requerido (ej. "vigilancia-fisica", "vigilancia-tecnologica").'),
  situation: z.string().describe('La situación o problema específico del usuario (ej. "prevencion-robos", "control-acceso").'),
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
    Eres un asistente virtual experto en seguridad para la empresa "Acon Shield".
    Tu objetivo es analizar la solicitud del usuario y proporcionar una recomendación clara y útil dentro de una conversación de chat.

    Contexto del usuario:
    - Busca una solución para: {{{solutionType}}}
    - Tipo de servicio: {{{entityType}}}
    - Situación específica: {{{situation}}}

    Servicios disponibles y sus enlaces de anclaje:
    - Vigilancia con Drones: #services
    - CCTV con IA: #services
    - Sistemas de Intrusión: #services
    - Control de Acceso RFID: #services
    - Detección de Incendios: #services
    - Guardas de Seguridad: #services
    - Cobertura Nacional: #coverage
    - Tecnología Avanzada: #tech
    - Sobre Nosotros: #about

    Instrucciones de respuesta:
    1. Comienza con un saludo amigable como "¡Hola! Gracias por tu consulta."
    2. Basado en la información proporcionada, analiza y recomienda 1 o 2 servicios que se ajusten mejor a la necesidad.
    3. **MUY IMPORTANTE**: Para cada servicio recomendado, incluye un enlace de anclaje HTML (ej. <a href="#services" class="underline text-primary">Vigilancia con Drones</a>).
    4. Después de las recomendaciones, finaliza SIEMPRE con la pregunta exacta: "¿Quieres una personalización más detallada?".
    5. La respuesta debe ser concisa, en un solo bloque de texto. No uses markdown, listas con guiones o numeración. Mantén un tono conversacional.
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
