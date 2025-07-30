"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User, Loader2, Send, X, Lightbulb } from "lucide-react";
import { Textarea } from "../ui/textarea";

// Tipado para recibir los datos del form (ajusta si tu tipo es diferente)
type SolutionAssistantInput = {
  solutionType: string;
  entityType: string;
  situation: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatbotProps {
  onClose: () => void;
  initialData?: SolutionAssistantInput | null;
}

const RECOMMENDATION_MATRIX: {
  [key: string]: any
} = {
  "mi-empresa": {
    "vigilancia-fisica": {
      "prevencion-robos": [
        "Implementar un esquema de vigilancia física 24/7 con guardias certificados, apoyados por rondas supervisadas y control de accesos, adaptando el número de guardias según áreas críticas detectadas en un análisis de riesgos específico para tu empresa.",
        "Complementar la vigilancia con estudios de confiabilidad periódicos del personal interno y externo, para reducir riesgos internos y reforzar la cultura de seguridad en el equipo de trabajo.",
      ],
      "control-acceso": [
        "Instalar un puesto de control de acceso físico en la entrada principal, con registro digital de visitantes y empleados, usando formatos modernos y chequeos visuales apoyados en listas de acceso previamente validadas.",
        "Capacitar a los guardias en técnicas de identificación y verificación documental, apoyando con supervisión aleatoria para evitar suplantaciones o ingresos no autorizados.",
      ],
      "monitoreo-remoto": [
        "Integrar vigilancia física con tecnología de monitoreo remoto desde la central operativa de Acon Security, permitiendo supervisión y reacción ante cualquier alerta las 24 horas.",
        "Equipar los puestos de vigilancia con radios y dispositivos móviles conectados a la app integral de Acon, para reportes en tiempo real y respuesta inmediata ante eventos sospechosos.",
      ],
      "otro": [
        "Realizar un diagnóstico personalizado de riesgos operativos de la empresa, entregando un informe y plan de acción integral que incluye sugerencias físicas y tecnológicas.",
        "Ofrecer capacitación en protocolos de emergencia y autoprotección para todo el personal de la empresa, reforzando la cultura preventiva.",
      ],
    },
    "vigilancia-tecnologica": {
      "prevencion-robos": [
        "Instalar un sistema de CCTV inteligente con análisis de video (detección de intrusos fuera de horario y alertas automáticas), vinculado al centro de monitoreo de Acon.",
        "Implementar sensores de movimiento y sistemas de alarma perimetral integrados, conectados a la app móvil de Acon Security para alertas instantáneas al cliente y a la central.",
      ],
      "control-acceso": [
        "Instalar sistemas de control de acceso electrónico (tarjetas, códigos QR o biometría) para empleados y visitantes, con registros de ingreso/salida en tiempo real.",
        "Integrar el sistema de control de acceso con cámaras de reconocimiento facial o lectura de placas, facilitando auditorías y minimizando suplantaciones.",
      ],
      "monitoreo-remoto": [
        "Implementar un centro de monitoreo remoto 24/7 con visualización en vivo de cámaras, sensores y alarmas de la empresa, coordinando la reacción ante cualquier incidencia.",
        "Ofrecer acceso remoto al cliente vía app o portal web, para que pueda revisar eventos, alertas y reportes de seguridad desde cualquier lugar.",
      ],
      "otro": [
        "Diseñar un programa de seguridad electrónica a la medida, combinando tecnología (drones, sensores, analítica de video) según las necesidades detectadas tras visita técnica.",
        "Integrar la tecnología de Acon con sistemas existentes del cliente, unificando todos los reportes en una sola plataforma (app Acon) para gestión centralizada.",
      ],
    },
    "consultoria": {
      "prevencion-robos": [
        "Realizar un análisis de riesgos y vulnerabilidades en la empresa (interna y externa), generando recomendaciones detalladas de mejoras físicas, humanas y tecnológicas.",
        "Asesorar en la elaboración de protocolos de prevención de robos, capacitando al personal en rutinas y alertas tempranas.",
      ],
      "control-acceso": [
        "Evaluar los procedimientos actuales de ingreso y egreso, proponiendo mejoras en los flujos y puntos críticos para evitar accesos no autorizados.",
        "Elaborar manuales y capacitaciones para el equipo administrativo y de seguridad sobre mejores prácticas en el control de accesos empresariales.",
      ],
      "monitoreo-remoto": [
        "Asesorar en la implementación de monitoreo remoto, incluyendo selección de proveedores, requerimientos técnicos y protocolos de reacción ante eventos.",
        "Proveer consultoría en integración de sistemas (alarmas, CCTV, control de acceso) para garantizar respuesta eficiente y centralizada.",
      ],
      "otro": [
        "Diagnóstico y diseño de un plan integral de gestión de riesgos, abarcando amenazas diversas (robo, sabotaje, fraude interno).",
        "Acompañamiento en procesos de certificación en seguridad (ISO 9001, BASC) y cumplimiento normativo sectorial.",
      ],
    },
  },
  "mi-hogar": {
    "vigilancia-fisica": {
      "prevencion-robos": [
        "Asignar guardia de seguridad fijo o móvil para el perímetro del conjunto o zona residencial, con rondas nocturnas programadas y comunicación directa a residentes vía app.",
        "Realizar charlas de autoprotección y prevención para la comunidad, sensibilizando sobre prácticas seguras y protocolos ante robos.",
      ],
      "control-acceso": [
        "Implementar registro digital de visitantes en portería y verificación de datos con foto, reduciendo riesgos de acceso no autorizado.",
        "Capacitar a los porteros/guardias en identificación de patrones de suplantación y técnicas de control de acceso, fomentando cultura de seguridad comunitaria.",
      ],
      "monitoreo-remoto": [
        "Instalar sistema de cámaras IP con visualización remota desde el celular de los residentes y supervisión desde central de Acon, permitiendo reacción ante alertas.",
        "Ofrecer botón de pánico digital para el hogar, integrado a la app móvil de Acon, que notifique de inmediato a la central y a vecinos autorizados ante emergencias.",
      ],
      "otro": [
        "Realizar análisis de seguridad de la vivienda y el entorno, recomendando medidas físicas y tecnológicas adaptadas al presupuesto familiar.",
        "Entregar recomendaciones personalizadas sobre hábitos de autoprotección, incluyendo simulacros de emergencia familiar.",
      ],
    },
    "vigilancia-tecnologica": {
      "prevencion-robos": [
        "Instalar alarmas con sensores en puertas y ventanas, vinculadas a la app móvil para alertas en tiempo real y reacción inmediata.",
        "Integrar cámaras de seguridad con visión nocturna y grabación en la nube, permitiendo monitoreo desde cualquier lugar.",
      ],
      "control-acceso": [
        "Implementar videoportero o citofonía virtual para validación visual de visitantes antes de autorizar ingreso.",
        "Utilizar cerraduras inteligentes (biometría, código o app) para control seguro del acceso principal.",
      ],
      "monitoreo-remoto": [
        "Ofrecer servicio de monitoreo remoto permanente desde la central de Acon Security, con reacción de supervisión móvil ante alertas.",
        "Integrar los dispositivos del hogar (cámaras, sensores, alarma) en una sola app para gestión y notificación unificada.",
      ],
      "otro": [
        "Diagnóstico de seguridad electrónica de la vivienda y asesoría en integración de nuevos dispositivos compatibles.",
        "Configuración de alertas personalizadas en la app (zonas de movimiento, horarios, etc.) para que cada familia adapte la seguridad a su ritmo de vida.",
      ],
    },
    "consultoria": {
      "prevencion-robos": [
        "Realizar visita y evaluación profesional del hogar, entregando informe de vulnerabilidades y recomendaciones de refuerzo físico y electrónico.",
        "Asesoría en políticas de convivencia y seguridad para conjuntos residenciales, fomentando la prevención colaborativa.",
      ],
      "control-acceso": [
        "Diagnóstico de puntos débiles en accesos (puertas, ventanas, garaje) y recomendaciones de refuerzo o modernización.",
        "Capacitación en prácticas seguras para los miembros del hogar (niños, adultos mayores, empleados domésticos) sobre control de acceso.",
      ],
      "monitoreo-remoto": [
        "Asesoría para implementar soluciones de monitoreo remoto a la medida del hogar, incluyendo recomendaciones de equipos, ubicaciones y conectividad.",
        "Consultoría en protocolos familiares ante incidentes detectados por monitoreo remoto (robos, incendios, emergencias médicas).",
      ],
      "otro": [
        "Elaboración de un plan familiar de respuesta a emergencias y asesoría en comunicación con autoridades y vecinos.",
        "Acompañamiento en la integración de la vivienda con redes de seguridad comunitaria o vecinal (chats, app de alertas).",
      ],
    },
  },
  "un-evento": {
    "vigilancia-fisica": {
      "prevencion-robos": [
        "Desplegar personal de seguridad capacitado y visible en puntos estratégicos del evento, con control de accesos y patrullaje preventivo antes, durante y después.",
        "Coordinar con la organización y autoridades un protocolo de reacción rápida ante incidentes, incluyendo zonas de respuesta y roles asignados.",
      ],
      "control-acceso": [
        "Implementar registro de ingreso digital y validación de identidad para asistentes, artistas y proveedores mediante listas y dispositivos móviles.",
        "Asignar personal exclusivo para puertas y accesos sensibles (backstage, áreas VIP), verificando credenciales y evitando ingresos no autorizados.",
      ],
      "monitoreo-remoto": [
        "Complementar la vigilancia física con monitoreo de cámaras portátiles (bodycams) y/o CCTV temporal, supervisado desde la central de Acon.",
        "Utilizar radios y dispositivos móviles conectados a la app de Acon para comunicación continua y reporte de novedades en tiempo real.",
      ],
      "otro": [
        "Elaborar un plan de seguridad y evacuación a la medida del evento, con roles y rutas claras, capacitando al staff previo al inicio.",
        "Asesorar a la organización en gestión de emergencias, puntos de encuentro y comunicación con autoridades.",
      ],
    },
    "vigilancia-tecnologica": {
      "prevencion-robos": [
        "Instalar cámaras de monitoreo temporal en entradas, salidas y puntos de alto riesgo, con grabación y visualización remota desde la central.",
        "Colocar sensores de intrusión en áreas restringidas para alertar ante intentos de ingreso no autorizado, con notificación inmediata al personal de seguridad.",
      ],
      "control-acceso": [
        "Utilizar sistemas de registro digital (QR/código de barras) para validación rápida de entradas, evitando filas y suplantaciones.",
        "Integrar lectores móviles de credenciales para el acceso a zonas críticas, con registro automático en la plataforma de Acon.",
      ],
      "monitoreo-remoto": [
        "Supervisar en tiempo real el flujo de personas y áreas críticas mediante cámaras conectadas a la central de monitoreo de Acon.",
        "Configurar alertas automáticas ante comportamientos inusuales detectados por analítica de video (aglomeraciones, intrusos fuera de zona).",
      ],
      "otro": [
        "Diseño de una red de seguridad temporal para el evento, integrando todos los dispositivos en un panel único accesible al organizador.",
        "Alquiler de tecnología (cámaras, sensores, radios) para eventos de corta duración, incluyendo instalación y soporte técnico por parte de Acon.",
      ],
    },
    "consultoria": {
      "prevencion-robos": [
        "Evaluar riesgos específicos del evento y diseñar un plan de prevención adaptado (zonas vulnerables, horarios, control de accesos, coordinación con autoridades).",
        "Capacitar al staff y organizadores en protocolos de prevención de robos y custodia de bienes de valor (equipos, cajas de venta, etc.).",
      ],
      "control-acceso": [
        "Auditar y diseñar procedimientos de control de ingreso/egreso para asistentes y proveedores, recomendando tecnología y protocolos según el tipo de evento.",
        "Proveer asesoría en señalización y flujos de movimiento de personas, minimizando riesgos de aglomeración y accesos no controlados.",
      ],
      "monitoreo-remoto": [
        "Asesoría en diseño de esquema de monitoreo para el evento, recomendando ubicación y tipo de cámaras, conexión a central y roles de supervisión.",
        "Definir procedimientos de reacción y comunicación para el staff ante incidentes detectados por monitoreo, asegurando una respuesta ágil.",
      ],
      "otro": [
        "Elaborar instructivos y capacitación exprés para el personal del evento en materia de seguridad, incluyendo atención a emergencias.",
        "Consultoría en estrategias de comunicación de riesgos y puntos seguros para los asistentes, facilitando la gestión y percepción de seguridad.",
      ],
    },
  },
};


// Devuelve recomendaciones según combinación seleccionada
function getRecommendations(data: SolutionAssistantInput): string[] {
  if (!data) return [];
  const st = (data.solutionType || "").toLowerCase();
  const et = (data.entityType || "").toLowerCase();
  const si = (data.situation || "").toLowerCase();
  return (
    RECOMMENDATION_MATRIX[st]?.[et]?.[si] || [
      "No se encontraron recomendaciones exactas para esta combinación.",
      "Por favor verifica tu selección o contáctanos para una asesoría personalizada.",
    ]
  );
}

export default function Chatbot({ onClose, initialData = null }: ChatbotProps) {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Cuando recibe datos del formulario, muestra recomendaciones
  useEffect(() => {
    if (initialData) {
      const recs = getRecommendations(initialData);
      setMessages([
        {
          role: "assistant",
          content: `
            <div>
              <div class="mb-2 text-sm flex items-center text-primary-900 dark:text-primary-200 bg-accent/10 px-3 py-2 rounded-lg shadow-sm border border-accent/20">
                <span class="mr-2">👋</span>
                Bienvenido, seré tu asistente virtual en este viaje de la seguridad. Entendemos lo que buscas y, después de analizarlo, te mostramos una pre-selección personalizada que puede acomodarse a tus necesidades.
              </div>

              <div class="mb-4 text-base font-bold flex items-center text-primary-700 dark:text-primary-200">
                <span class="inline-block mr-2 align-middle"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" /></svg></span>
                <br/>
                Recomendaciones personalizadas para ti:
              </div>
              <div class="space-y-4">
                ${recs
              .map(
                (r, idx) =>
                  `<div class="rounded-xl bg-accent/10 border border-accent/30 p-4 shadow transition hover:scale-[1.02] flex gap-3 items-start">
                        <span class="mt-0.5 text-accent"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" /></svg></span>
                        <div>${r}</div>
                      </div>`
              )
              .join("")}
              </div>
            </div>
          `,
        },
      ]);
    } else {
      setMessages([
        {
          role: "assistant",
          content:
            "¡Hola! Soy tu asistente de Acon Shield. ¿En qué puedo ayudarte hoy? Cuéntame qué necesitas.",
        },
      ]);
    }
  }, [initialData]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isPending) return;

    const userMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput("");

    startTransition(async () => {
      // Aquí puedes personalizar la respuesta, o simplemente agradecer y esperar nueva pregunta.
      const botResponse: Message = {
        role: "assistant",
        content:
          "Gracias por los detalles. Un especialista revisará tu caso y se pondrá en contacto contigo. ¿Hay algo más en lo que pueda ayudarte?",
      };
      setMessages((prev) => [...prev, botResponse]);
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-in fade-in duration-300">
      <Card className="w-[370px] max-w-full h-[600px] max-h-[80vh] shadow-2xl rounded-2xl flex flex-col border border-neutral-200/60 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-lg transition-all duration-300 relative overflow-hidden">
        {/* Botón de cierre X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full p-1.5 hover:bg-red-500/80 bg-zinc-200/60 dark:bg-zinc-800/70 transition-colors text-zinc-500 dark:text-zinc-300 hover:text-white shadow-sm border border-zinc-200 dark:border-zinc-700"
          aria-label="Cerrar chatbot"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <CardHeader className="flex flex-row items-center gap-4 p-4 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-teal-500/80 via-primary/80 to-indigo-500/70 text-primary-foreground/90 rounded-t-2xl shadow-sm">
          <Avatar>
            <AvatarImage
              src="https://placehold.co/40x40.png"
              alt="Acon Shield Assistant"
              data-ai-hint="logo shield"
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-lg font-bold tracking-tight drop-shadow-sm">
              Asistente Acon Shield
            </CardTitle>
            <div className="text-xs text-primary-foreground/90 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              Online
            </div>
          </div>
        </CardHeader>

        {/* MENSAJES */}
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea
            className="h-full p-4 space-y-6 scrollbar-hide"
            ref={scrollAreaRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {msg.role === "assistant" && (
                  <Avatar className="h-8 w-8 bg-muted text-muted-foreground self-start shadow-sm">
                    <AvatarFallback>
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
                {msg.role === "assistant" ? (
                  <div
                    className="rounded-2xl px-4 py-3 max-w-[80%] text-sm shadow-lg transition-all
                    bg-zinc-200/90 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 rounded-bl-md"
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                ) : (
                  <div
                    className="rounded-2xl px-4 py-3 max-w-[80%] text-sm shadow-lg transition-all
                    bg-gradient-to-tr from-indigo-500/90 via-teal-500/90 to-cyan-400/80 text-white rounded-br-md"
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                )}
                {msg.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://placehold.co/40x40.png"
                      alt="User"
                      data-ai-hint="person avatar"
                    />
                    <AvatarFallback>
                      <User size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="p-3 border-t border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 rounded-b-2xl">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 w-full"
          >
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Escribe tu mensaje..."
              disabled={isPending}
              autoComplete="off"
              className="flex-1 resize-none bg-zinc-100/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 focus:ring-primary scrollbar-hide rounded-xl px-3 py-2 placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100 text-base shadow-inner"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isPending || !userInput.trim()}
              aria-label="Enviar mensaje"
              className="rounded-full h-10 w-10 bg-gradient-to-tr from-teal-500 via-indigo-500 to-cyan-400 hover:scale-105 transition-transform shadow-md border-2 border-white/50 dark:border-zinc-800"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
