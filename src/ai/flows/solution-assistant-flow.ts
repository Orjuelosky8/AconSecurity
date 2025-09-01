
'use server';
/**
 * @fileOverview Un asistente de IA que recomienda soluciones de seguridad y mantiene una conversación.
 *
 * - solutionAssistant - Una función que sugiere soluciones y responde preguntas basadas en la entrada del usuario y el historial de chat.
 * - SolutionAssistantInput - El tipo de entrada para la función solutionAssistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const knowledgeBase = `
Servicios principales de Acon Security:
- Vigilancia fija (seguridad estática): Protección permanente con guardias capacitados en puestos fijos (accesos, recepciones) para prevenir, disuadir y responder a amenazas en instalaciones corporativas, residenciales o industriales.
- Vigilancia móvil (patrullaje motorizado): Cobertura de áreas extensas mediante rondas constantes en vehículos o motocicletas para supervisar perímetros y responder rápidamente.
- Escoltas a personas (protección personal): Servicio de seguridad cercana para ejecutivos y particulares, con personal entrenado en técnicas de protección y reacción.
- Escolta de mercancías (seguridad en tránsito): Protección armada de bienes y carga durante su transporte para prevenir robos, incluyendo monitoreo en tiempo real.
- Seguridad electrónica y monitoreo 24/7: Operación de una central de monitoreo que supervisa cámaras, alarmas y sensores en tiempo real para una respuesta inmediata.

Tecnologías de seguridad implementadas:
- Circuito Cerrado de Televisión (CCTV) avanzado: Cámaras de alta resolución con análisis de video e IA para detectar movimientos y comportamientos sospechosos.
- Sistemas de alarma y sensores especializados: Sensores de movimiento, apertura, pánicos y detectores de humo o sonido conectados a la central.
- Control de acceso electrónico: Sistemas con tarjetas, biometría o QR para regular y auditar el ingreso a zonas restringidas.
- Monitoreo satelital y GPS: Seguimiento en tiempo real de vehículos y mercancías para servicios de escolta y vigilancia móvil.
- Comunicación y respuesta inmediata: Equipos de radio, smartphones y apps de gestión para una coordinación continua entre guardias y la central.
`;

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const SolutionAssistantInputSchema = z.object({
  initialData: z.object({
    solutionType: z.string().describe('El tipo de propiedad que el usuario busca proteger (ej. "mi-empresa", "mi-hogar", "conjunto-residencial").'),
    entityType: z.string().describe('El tipo de servicio de seguridad requerido (ej. "vigilancia-fija", "vigilancia-movil", "escoltas", "seguridad-electronica").'),
    situation: z.string().describe('La situación o problema específico del usuario (ej. "prevenir-robos", "control-accesos", "proteger-transporte").'),
  }).optional(),
  history: z.array(MessageSchema).optional().describe("El historial de la conversación hasta ahora."),
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
    Eres un asistente virtual experto en seguridad para la empresa "Acon Security", cuyo lema es "Servimos por vocación". Tu objetivo es analizar la solicitud del usuario y proporcionar una recomendación clara y útil dentro de una conversación de chat, utilizando la base de conocimiento proporcionada.

    **Base de Conocimiento de Acon Security:**
    ${knowledgeBase}

    **Instrucciones de Interacción:**

    1.  **Si es el primer mensaje (no hay historial):**
        *   Analiza los datos de 'initialData' (solutionType, entityType, situation).
        *   Comienza con un saludo amigable: "¡Hola! Gracias por tu consulta. En Acon Security, servimos por vocación y estamos aquí para ayudarte."
        *   Basado en la información proporcionada, recomienda 1 o 2 servicios que se ajusten mejor a la necesidad. Sé específico.
        *   **MUY IMPORTANTE**: Para cada servicio recomendado, genera un enlace con el atributo 'data-service' que contenga el nombre EXACTO del servicio. Ejemplo: <a href="#" data-service="Vigilancia Fija" class="underline text-primary">Vigilancia Fija</a>.
        *   Finaliza SIEMPRE con la pregunta exacta: "¿Quieres una personalización más detallada o tienes alguna otra pregunta?".

    2.  **Si hay historial de conversación:**
        *   Lee el último mensaje del usuario en 'history'.
        *   Usa la **Base de Conocimiento** para responder a la pregunta del usuario de manera precisa y conversacional.
        *   Si te preguntan por algo fuera de la base de conocimiento, amablemente indica que tu especialidad es la seguridad y los servicios de Acon Security.
        *   Mantén las respuestas concisas y claras. No uses markdown, listas con guiones o numeración.

    **Contexto de la conversación actual (si aplica):**
    {{#if history}}
    Historial:
    {{#each history}}
    - {{role}}: {{content}}
    {{/each}}
    {{/if}}

    **Solicitud inicial del usuario (si aplica):**
    {{#if initialData}}
    - Busca proteger: {{{initialData.solutionType}}}
    - Necesita un servicio de: {{{initialData.entityType}}}
    - Su objetivo es: {{{initialData.situation}}}
    {{/if}}
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
