/**
 * Sistema de Animaciones Modular
 * =============================
 * Este módulo proporciona un sistema completo de animaciones y efectos visuales
 * para la aplicación. Está diseñado para ser modular, reutilizable y fácil de mantener.
 * 
 * Características principales:
 * - Efectos individuales (glitch, typewriter, card3D)
 * - Sistema de composición de efectos
 * - Gestión de estados y limpieza automática
 * - Mensajes de depuración detallados
 * 
 * Uso básico:
 * ```javascript
 * // Uso individual
 * import { glitch } from './animations.js';
 * glitch('mi-elemento', { glitchMode: 'pattern' });
 * 
 * // Uso con composición
 * import { EffectManager, glitch, typewriter } from './animations.js';
 * const manager = new EffectManager('mi-elemento')
 *   .addEffect('glitch', glitch, { glitchMode: 'pattern' })
 *   .addEffect('typewriter', typewriter, { text: 'Hola' });
 * ```
 * 
 * @module animations
 */

// Importaciones
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// CONSTANTES Y CONFIGURACIÓN
// ============================================================================

/**
 * Configuración por defecto para los efectos
 * @constant
 */
const DEFAULT_CONFIG = {
  GLITCH: {
    MODES: {
      PATTERN: 'pattern',
      PERMANENT: 'permanent',
      DECODE: 'decode',
      SUBTLE_PATTERN: 'subtle-pattern' // Nuevo modo para glitch visual sutil e intermitente
    },
    PATTERN: { ON: 200, OFF: 2800 }, // Patrón más espaciado
    SUBTLE_PATTERN_CONFIG: { ON: 100, OFF: 4000 }, // Para el glitch sutil
    DECODE_DURATION: 2000, // Duración para el proceso de revelado del texto
    REVEAL_SPEED: 0.7,
    ANIMATION_INTERVAL: 50,
    SCRAMBLE_CHARS: "!<>-_#*", // Menos caracteres para que sea un poco más limpio
    SUBTLE_SCRAMBLE_CHARS: ".:"
  },
  TYPEWRITER: {
    SPEED: 50
  },
  CARD3D: {
    PERSPECTIVE: 1000,
    MAX_ROTATION: 7, // Aún más sutil
    DURATION: 0.4,
    EASE: "power2.out"
  }
};

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Verifica si un elemento existe en el DOM y emite un warning detallado si no
 * @param {string} elementId - ID del elemento a verificar
 * @param {string} effectName - Nombre del efecto que está intentando usar el elemento
 * @returns {HTMLElement | null} - El elemento o null si no existe
 */
const getElement = (elementId, effectName) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`[ANIMATIONS:${effectName}] ⚠️ Elemento no encontrado - ID: "${elementId}"`);
    return null;
  }
  return element;
};

/**
 * Limpia los efectos de un elemento y emite un log detallado
 * @param {HTMLElement} element - Elemento a limpiar
 * @param {string[]} classes - Clases a remover
 * @param {string[]} attributes - Atributos a remover
 * @param {string} effectName - Nombre del efecto que se está limpiando
 */
const cleanupElement = (element, classes = [], attributes = [], effectName) => {
  if (!element) return;
  classes.forEach(cls => element.classList.remove(cls));
  attributes.forEach(attr => element.removeAttribute(attr));
};

// ============================================================================
// EFECTOS INDIVIDUALES
// ============================================================================

/**
 * Efecto de máquina de escribir
 * 
 * Este efecto simula la escritura de texto carácter por carácter, como una máquina de escribir.
 * 
 * Ejemplo de uso:
 * ```javascript
 * // Uso básico
 * typewriter('mi-elemento', 'Texto a escribir', 75);
 * 
 * // Con async/await
 * await typewriter('mi-elemento', 'Texto a escribir');
 * ```
 * 
 * @param {string} elementId - ID del elemento donde se escribirá el texto
 * @param {string} text - Texto a escribir
 * @param {number} [speed=75] - Velocidad de escritura en milisegundos
 * @returns {Promise<void>} - Se resuelve cuando termina de escribir
 */
export const typewriter = (elementId, textToType, speed = DEFAULT_CONFIG.TYPEWRITER.SPEED) => {
  const element = getElement(elementId, 'TYPEWRITER');
  return new Promise((resolve, reject) => {
    if (!element) {
      resolve();
      return;
    }
    element.textContent = "";
    let i = 0;
    function typeCharacter() {
      if (i < textToType.length) {
        element.textContent += textToType.charAt(i);
        i++;
        setTimeout(typeCharacter, speed);
      } else {
        resolve();
      }
    }
    typeCharacter();
  });
};

/**
 * Configuración del efecto glitch
 * @typedef {Object} GlitchConfig
 * @property {string} [glitchMode="pattern"] - Modo del glitch: "pattern" | "permanent" | "decode"
 * @property {Object} [glitchPattern={on: 2000, off: 1000}] - Patrón de tiempo para el modo "pattern"
 * @property {string} [scrambleChars] - Caracteres para el scramble
 * @property {number} [decodeDuration=5000] - Duración de la decodificación en ms
 * @property {number} [decodeSteps=50] - Número de pasos en la decodificación (más pasos = más suave)
 * @property {string} [decodeEase="power2.out"] - Función de easing para la decodificación
 * @property {boolean} [alwaysDecode=true] - Si true, siempre decodifica antes de aplicar el modo final
 */

/**
 * Efecto de glitch para texto
 * 
 * Este efecto crea una distorsión visual en el texto con diferentes modos:
 * - pattern: Alterna entre texto normal y glitch
 * - permanent: Mantiene un glitch constante
 * - decode: Decodifica el texto progresivamente
 * 
 * Ejemplo de uso:
 * ```javascript
 * // Modo pattern (alterna)
 * glitch('mi-elemento', {
 *   glitchMode: 'pattern',
 *   glitchPattern: { on: 2000, off: 1000 }
 * });
 * 
 * // Modo decode (decodificación progresiva)
 * glitch('mi-elemento', {
 *   glitchMode: 'decode',
 *   decodeDuration: 3000
 * });
 * ```
 * 
 * @param {string} elementId - ID del elemento
 * @param {GlitchConfig} config - Configuración del efecto
 * @returns {Object} - Métodos para controlar el efecto
 */
export const glitch = (elementId, config = {}) => {
  const element = getElement(elementId, 'GLITCH');
  if (!element) return { stop: () => {}, decodePromise: Promise.resolve() };

  const conf = {
    glitchMode: config.glitchMode || DEFAULT_CONFIG.GLITCH.MODES.DECODE,
    glitchPattern: { ...DEFAULT_CONFIG.GLITCH.PATTERN, ...config.glitchPattern },
    scrambleChars: config.scrambleChars || DEFAULT_CONFIG.GLITCH.SCRAMBLE_CHARS,
    decodeDuration: config.decodeDuration || DEFAULT_CONFIG.GLITCH.DECODE_DURATION,
    revealSpeed: config.revealSpeed || DEFAULT_CONFIG.GLITCH.REVEAL_SPEED,
    animationInterval: config.animationInterval || DEFAULT_CONFIG.GLITCH.ANIMATION_INTERVAL,
  };

  const originalText = (element.dataset.originalText || element.textContent || "").trim();
  if (!originalText) {
      console.warn(`[GLITCH] Texto original vacío para ${elementId}. El efecto puede no funcionar como se espera.`);
  }
  element.dataset.originalText = originalText;
  element.setAttribute('data-text', originalText);

  let decodeIntervalId = null;
  let patternIntervalId = null;
  let patternTimeoutId = null;

  const applyVisualGlitchClass = (apply, subtle = false) => {
    if (!element) return;
    element.classList.remove('glitch-effect-text', 'subtle-glitch-effect-text');
    if (apply) {
      element.classList.add(subtle ? 'subtle-glitch-effect-text' : 'glitch-effect-text');
      element.setAttribute('data-text', element.textContent); // Asegurar que data-text se actualice para el CSS
    }
  };

  const performScramble = (textToScramble, iteration) => {
    return textToScramble.split("").map((letter, index) => {
      if (index < iteration || letter === " " || letter === "\n") return letter;
      const chars = conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.SUBTLE_PATTERN || conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.SUBTLE_DECODE ? DEFAULT_CONFIG.GLITCH.SUBTLE_SCRAMBLE_CHARS : conf.scrambleChars;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
  };

  const decodeFn = () => new Promise(resolve => {
    if (!element) { resolve(); return; }
    let iteration = 0;
    const textToDecode = element.dataset.originalText || ""; // Siempre decodificar al original
    applyVisualGlitchClass(true, conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.SUBTLE_DECODE);

    if (decodeIntervalId) clearInterval(decodeIntervalId); // Limpiar intervalo anterior
    decodeIntervalId = window.setInterval(() => {
      const scrambledText = performScramble(textToDecode, iteration);
      element.textContent = scrambledText;
      element.setAttribute('data-text', scrambledText);

      if (iteration >= textToDecode.length) {
        clearInterval(decodeIntervalId);
        decodeIntervalId = null;
        element.textContent = textToDecode;
        element.setAttribute('data-text', textToDecode);
        if (conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.DECODE) { // Solo en DECODE puro se quita el visual
          applyVisualGlitchClass(false);
        }
        // Para SUBTLE_DECODE, el glitch visual (sutil) permanece si se configuró así o se maneja por pattern.
        resolve();
      }
      iteration += conf.revealSpeed;
    }, conf.animationInterval);
  });

  const startPattern = (subtle = false) => {
    if (!element) return;
    stop(); // Detiene cualquier cosa que estuviera corriendo antes
    const currentPatternConfig = subtle ? (config.glitchPattern || DEFAULT_CONFIG.GLITCH.SUBTLE_PATTERN_CONFIG) : conf.glitchPattern;

    applyVisualGlitchClass(true, subtle); // Activar glitch
    element.setAttribute('data-text', generateGlitchText(originalText, subtle)); // Glitchear data-text

    patternTimeoutId = window.setTimeout(() => {
      applyVisualGlitchClass(false, subtle); // Desactivar glitch
      element.setAttribute('data-text', originalText); // Restaurar data-text

      patternTimeoutId = window.setTimeout(() => startPattern(subtle), currentPatternConfig.off);
    }, currentPatternConfig.on);
  };

  const generateGlitchText = (text, subtle) => { // Helper para el modo pattern
    const chars = subtle ? DEFAULT_CONFIG.GLITCH.SUBTLE_SCRAMBLE_CHARS : conf.scrambleChars;
    return text.split("").map(char => {
      if (char === " " || char === "\n" || Math.random() > 0.3) return char; // Glitchea menos caracteres
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
  };
  
  const stop = () => {
    if (decodeIntervalId) clearInterval(decodeIntervalId);
    if (patternIntervalId) clearInterval(patternIntervalId); // No lo usábamos, era patternTimeoutId
    if (patternTimeoutId) clearTimeout(patternTimeoutId);
    decodeIntervalId = null;
    patternIntervalId = null;
    patternTimeoutId = null;
    applyVisualGlitchClass(false);
    if (element && element.dataset.originalText) {
      element.textContent = element.dataset.originalText;
      element.setAttribute('data-text', element.dataset.originalText);
    }
  };

  // Inicialización
  if (conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.DECODE || conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.SUBTLE_DECODE) {
    // La decodificación se maneja a través de la promesa devuelta
  } else if (conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.PATTERN) {
    startPattern(false);
  } else if (conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.SUBTLE_PATTERN) {
    startPattern(true);
  } else if (conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.PERMANENT) {
    applyVisualGlitchClass(true); // Glitch visual CSS permanente
    // Podrías añadir un setInterval aquí si quieres que el texto cambie constantemente
  }

  return { stop, decodePromise: (conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.DECODE || conf.glitchMode === DEFAULT_CONFIG.GLITCH.MODES.SUBTLE_DECODE) ? decodeFn() : Promise.resolve() };
};

/**
 * Efecto de tarjeta 3D
 * 
 * Este efecto crea una rotación 3D suave basada en la posición del mouse.
 * 
 * Ejemplo de uso:
 * ```javascript
 * // Configuración básica
 * card3D('mi-tarjeta', {
 *   perspective: 1000,
 *   maxRotation: 15
 * });
 * 
 * // Configuración personalizada
 * card3D('mi-tarjeta', {
 *   perspective: 2000,
 *   maxRotation: 30,
 *   duration: 0.3,
 *   ease: "power3.out"
 * });
 * ```
 * 
 * @param {string} elementId - ID del elemento
 * @param {Object} config - Configuración del efecto
 * @returns {Object} - Métodos para controlar el efecto
 */
export const card3D = (elementId, config = {}) => {
  const element = getElement(elementId, 'CARD3D');
  if (!element) return { stop: () => {} };

  const conf = { ...DEFAULT_CONFIG.CARD3D, ...config };
  const wrapper = element.parentElement;

  if (!wrapper) {
    console.warn(`[ANIMATIONS:CARD3D] ⚠️ Padre no encontrado para ${elementId}`);
    return { stop: () => {} };
  }

  wrapper.style.perspective = `${conf.perspective}px`;
  element.style.transformStyle = "preserve-3d";

  const handleMouseMove = (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;
    const rotateY = (xPercent - 0.5) * (conf.maxRotation * 2);
    const rotateX = (0.5 - yPercent) * (conf.maxRotation * 2);
    gsap.to(element, { duration: conf.duration, rotateY, rotateX, ease: conf.ease });
  };

  const handleMouseLeave = () => {
    gsap.to(element, { duration: conf.duration, rotateY: 0, rotateX: 0, ease: conf.ease });
  };

  wrapper.addEventListener("mousemove", handleMouseMove);
  wrapper.addEventListener("mouseleave", handleMouseLeave);

  return {
    stop: () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      gsap.to(element, { duration: 0.3, rotateY: 0, rotateX: 0, ease: "power2.out" });
    }
  };
};

// ============================================================================
// SISTEMA DE COMPOSICIÓN DE EFECTOS
// ============================================================================

/**
 * Clase para gestionar múltiples efectos en un elemento
 * 
 * Esta clase permite aplicar y gestionar múltiples efectos en un mismo elemento
 * de forma organizada y controlada.
 * 
 * Ejemplo de uso:
 * ```javascript
 * const manager = new EffectManager('mi-elemento')
 *   .addEffect('glitch', glitch, { glitchMode: 'pattern' })
 *   .addEffect('typewriter', typewriter, { text: 'Hola' });
 * ```
 */
export class EffectManager {
  /**
   * @param {string} elementId - ID del elemento a gestionar
   */
  constructor(elementId) {
    this.elementId = elementId;
    this.effects = new Map();
    this.element = getElement(elementId, 'EFFECT_MANAGER');
    if (!this.element) {
      console.warn(`[EFFECT_MANAGER] ⚠️ No se pudo crear gestor para ${elementId}: Elemento no encontrado.`);
    }
  }

  /**
   * Añade un efecto al elemento
   * @param {string} effectName - Nombre del efecto
   * @param {Function} effectFn - Función del efecto
   * @param {Object} config - Configuración del efecto
   * @returns {this} - Para encadenar métodos
   */
  addEffect(effectName, effectFn, config = {}) {
    if (!this.element) return this;
    if (this.effects.has(effectName)) {
      this.stopEffect(effectName);
    }
    try {
      const effectInstance = effectFn(this.elementId, config);
      if (effectInstance && typeof effectInstance.stop === 'function') {
        this.effects.set(effectName, effectInstance);
      } else {
        console.warn(`[EFFECT_MANAGER] ⚠️ Efecto ${effectName} no retornó un objeto con método stop() o no se inicializó correctamente.`);
      }
    } catch (error) {
      console.error(`[EFFECT_MANAGER] ❌ Error añadiendo ${effectName} a ${this.elementId}:`, error);
    }
    return this;
  }

  /**
   * Detiene un efecto específico
   * @param {string} effectName - Nombre del efecto a detener
   * @returns {this} - Para encadenar métodos
   */
  stopEffect(effectName) {
    if (!this.effects.has(effectName)) return this;
    const effect = this.effects.get(effectName);
    effect.stop();
    this.effects.delete(effectName);
    return this;
  }

  /**
   * Detiene todos los efectos
   * @returns {this} - Para encadenar métodos
   */
  stopAllEffects() {
    this.effects.forEach(effect => effect.stop());
    this.effects.clear();
    return this;
  }
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

/**
 * Inicializa todos los efectos cuando el DOM está listo
 * 
 * Esta función configura todos los efectos predefinidos para la aplicación.
 * Se ejecuta automáticamente cuando el DOM está listo.
 * 
 * Para personalizar los efectos, modifica los objetos de configuración
 * en esta función o crea tu propia función de inicialización.
 */
export const initializeEffects = () => {
  console.log(`[ANIMATIONS:INIT] 🚀 Iniciando. GSAP: ${gsap.version}, ScrollTrigger: ${ScrollTrigger.version}`);

  document.addEventListener("DOMContentLoaded", () => {
    console.log("[ANIMATIONS:INIT] 📄 DOM cargado, configurando efectos...");

    try {
      // --- Efectos del HERO ---
      glitch("code-snippet-text", { // Esto llamará a decodeFn y se resolverá
        glitchMode: DEFAULT_CONFIG.GLITCH.MODES.DECODE,
        decodeDuration: 3500, // Más corto
        revealSpeed: 0.5, // Más rápido
      });

      new EffectManager("code-snippet-system").addEffect("glitch", glitch, {
        glitchMode: DEFAULT_CONFIG.GLITCH.MODES.PATTERN,
        glitchPattern: { on: 850, off: 3000 },
        scrambleChars: "SYSTEM_ONLINE_ERROR_CHECK"
      });
      new EffectManager("code-snippet-time").addEffect("glitch", glitch, {
        glitchMode: DEFAULT_CONFIG.GLITCH.MODES.PATTERN,
        glitchPattern: { on: 150, off: 4000 },
        scrambleChars: "0123456789:[]"
      });
      new EffectManager("final-transmission").addEffect("glitch", glitch, {
        glitchMode: DEFAULT_CONFIG.GLITCH.MODES.PATTERN,
        glitchPattern: { on: 150, off: 4000 },
        scrambleChars: "/_TRANSMISIÓN_FINALIZADA"
      });
      new EffectManager("about-title").addEffect("glitch", glitch, {
        glitchMode: DEFAULT_CONFIG.GLITCH.MODES.PATTERN,
        glitchPattern: { on: 150, off: 4000 },
        scrambleChars: "_%&$@#/?!*"
      });
      
      new EffectManager("id-card").addEffect("card3D", card3D);

      // --- Secuencia de Animación para "Sobre Mí" ---
      const aboutSection = getElement("sobre-mi", 'INIT_ABOUT_SECTION');
      if (aboutSection) {
        const loadingTextElement = getElement("about-loading-text", 'INIT_ABOUT_LOADING');
        const loadingBarElement = getElement("about-loading-bar", 'INIT_ABOUT_LOADING_BAR');
        const loadingContainerElement = getElement("about-loading-container", 'INIT_ABOUT_LOADING_CONTAINER');
        const aboutTitleElement = getElement("about-title", 'INIT_ABOUT_TITLE');
        const cardColumnElement = getElement("about-card-column", 'INIT_ABOUT_CARD');
        const textColumnElement = getElement("about-text-column", 'INIT_ABOUT_TEXTCOL');
        const finalTransmissionElement = getElement("final-transmission", 'INIT_ABOUT_FINAL');

        if (loadingTextElement && loadingBarElement && loadingContainerElement && aboutTitleElement && cardColumnElement && textColumnElement) {
          // Configurar estado inicial
          gsap.set([loadingTextElement, loadingBarElement, loadingContainerElement, aboutTitleElement, cardColumnElement, textColumnElement, finalTransmissionElement], { autoAlpha: 0 });
          if (finalTransmissionElement) gsap.set(finalTransmissionElement, {y: 10});
          gsap.set(loadingBarElement, {width: '0%'});

          ScrollTrigger.create({
            trigger: aboutSection,
            start: "top 70%",
            once: true,
            onEnter: async () => {
              const tl = gsap.timeline();
              
              // Mostrar elementos de carga
              tl.to([loadingTextElement, loadingContainerElement], { 
                autoAlpha: 1, 
                duration: 0.5,
                ease: "power2.out"
              });

              // Aplicar glitch de decodificación al texto de carga
              const loadingGlitchInstance = glitch(loadingTextElement.id, {
                glitchMode: DEFAULT_CONFIG.GLITCH.MODES.DECODE,
                decodeDuration: 2000,
                scrambleChars: DEFAULT_CONFIG.GLITCH.SUBTLE_SCRAMBLE_CHARS,
                revealSpeed: 0.7
              });

              // Animar la barra de carga
              tl.to(loadingBarElement, {
                width: '100%',
                duration: 2,
                ease: "power1.inOut",
                onComplete: () => {
                  // Después de completar la carga, ocultar elementos de carga
                  gsap.to([loadingTextElement, loadingContainerElement], {
                    autoAlpha: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                      // Remover elementos de carga del DOM
                      loadingTextElement.remove();
                      loadingContainerElement.remove();
                    }
                  });
                }
              }, "-=1.5"); // Comenzar antes de que termine el glitch

              // Esperar a que termine la decodificación antes de continuar
              await loadingGlitchInstance.decodePromise;

              // Mostrar el contenido
              tl.to(aboutTitleElement, { 
                autoAlpha: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.8, 
                ease: "power2.out" 
              })
              .to(cardColumnElement, { 
                autoAlpha: 1, 
                scale: 1, 
                x: 0, 
                y: 0, 
                duration: 1, 
                ease: "power3.out" 
              }, "-=0.6")
              .to(textColumnElement, { 
                autoAlpha: 1, 
                scale: 1, 
                x: 0, 
                y: 0, 
                duration: 1, 
                ease: "power3.out" 
              }, "<0.3");

              // Mostrar el texto final con efecto de escritura
              if (finalTransmissionElement) {
                tl.add(async () => {
                  const finalText = finalTransmissionElement.dataset.originalText || "/_TRANSMISIÓN_FINALIZADA";
                  gsap.set(finalTransmissionElement, {autoAlpha: 1});
                  await typewriter(finalTransmissionElement.id, finalText, 50);
                  new EffectManager(finalTransmissionElement.id).addEffect("glitch", glitch, {
                    glitchMode: DEFAULT_CONFIG.GLITCH.MODES.SUBTLE_PATTERN,
                    glitchPattern: DEFAULT_CONFIG.GLITCH.SUBTLE_PATTERN_CONFIG,
                    scrambleChars: DEFAULT_CONFIG.GLITCH.SUBTLE_SCRAMBLE_CHARS
                  });
                }, "+=0.3");
              }
            }
          });
        } else {
          console.warn("[ANIMATIONS:INIT_ABOUT] ⚠️ Faltan elementos para secuencia 'Sobre Mí'.");
        }
      }
      console.log("[ANIMATIONS:INIT] ✅ Sistema de animaciones inicializado.");
    } catch (error) {
      console.error("[ANIMATIONS:INIT] ❌ Error al inicializar animaciones:", error);
    }
  });
};

// Exportar todo
export default {
  typewriter,
  glitch,
  card3D,
  EffectManager,
  initializeEffects,
  DEFAULT_CONFIG
};
