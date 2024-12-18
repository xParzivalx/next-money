/**
 * 主题前缀
 */
export const Prefix = "meme";
export const IconPrefix = Prefix + "-icon";

export enum model {
  pro = "black-forest-labs/flux-pro",
  schnell = "black-forest-labs/flux-schnell",
  dev = "black-forest-labs/flux-dev",
  general = "lucataco/flux-dev-lora",
  freeSchnell = "siliconflow/flux-schnell",
}

export enum loras {
  wukong = "wukong",
  alvdansen = "alvdansen",
  AWPortrait = "AWPortrait",
}

export const LoraConfig = {
  [loras.wukong]: {
    name: "BlackMythWukong Lora",
    styleName: "WuKong Style",
  },
  [loras.alvdansen]: {
    name: "Koda Lora",
    styleName: "Koda Style",
  },
  [loras.AWPortrait]: {
    name: "Portrait Lora",
    styleName: "Portrait Style",
  },
};

export const Credits = {
  [model.pro]: 10,
  [model.schnell]: 1,
  [model.dev]: 5,
  [model.general]: 8,
  [model.freeSchnell]: 0,
};

export const ModelName = {
  [model.pro]: "FLUX.1 [pro]",
  [model.schnell]: "FLUX.1 [schnell]",
  [model.dev]: "FLUX.1 [dev]",
  [model.general]: "FLUX.1 General",
  [model.freeSchnell]: "FLUX.1 [schnell]",
};

export enum Ratio {
  r1 = "1:1",
  r2 = "16:9",
  r3 = "9:16",
  r4 = "3:2",
  r5 = "2:3",
  r6 = "1:2",
  r7 = "3:4",
}



export const ModelDefaultAdVancedSetting = {
  [model.pro]: {
    steps: {
      default: 25,
      min: 1,
      max: 50,
    },
    guidance: {
      default: 3,
      min: 2,
      max: 5,
    },
    interval: {
      default: 2,
      min: 1,
      max: 4,
    },
    safety_tolerance: {
      default: 2,
      min: 1,
      max: 5,
    },
  },
  [model.schnell]: "FLUX.1 [schnell]",
  [model.dev]: "FLUX.1 [dev]",
};

export const subscriptionPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfecto para empezar",
    price: {
      monthly: 1000,
      yearly: 7500
    },
    stripePriceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PRICE_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PRICE_ID!
    },
    credits: 100,
    features: [
      "100 créditos mensuales",
      "Renovación automática"
    ],
    metadata: {
      recommended: false,
      popular: true
    }
  },
  {
    id: "pro",
    name: "Profesional",
    description: "Para uso profesional",
    price: {
      monthly: 2000,
      yearly: 15000
    },
    stripePriceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID!
    },
    credits: 300,
    features: [
      "300 créditos mensuales",
      "Renovación automática",
      "Soporte prioritario",
      "Acceso a todas las funciones"
    ],
    metadata: {
      recommended: true,
      popular: false
    }
  },
  {
    id: "business",
    name: "Business",
    description: "Solución empresarial completa",
    price: {
      monthly: 5000,
      yearly: 45000
    },
    stripePriceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID!
    },
    credits: 1000,
    features: [
      "1000 créditos mensuales",
      "Renovación automática",
      "Soporte prioritario 24/7",
      "Acceso a todas las funciones"
    ],
    metadata: {
      recommended: false,
      popular: false,
      enterprise: true
    }
  }
];

export const subscriptionConfig = {
  webhook: {
    secret: process.env.STRIPE_WEBHOOK_SECRET_SUBSCRIPTION!,
  },
  stripe: {
    key: process.env.STRIPE_SECRET_KEY!,
  }
}; 