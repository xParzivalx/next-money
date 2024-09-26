import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Eraser,
  File,
  FileText,
  Gift,
  HelpCircle,
  History,
  HomeIcon,
  Image,
  Languages,
  Laptop,
  LineChart,
  Loader2,
  LucideIcon,
  LucideProps,
  Moon,
  MoreVertical,
  Plus,
  Puzzle,
  Search,
  Settings,
  SunMedium,
  Trash,
  User,
  X,
  TextSearch,
  Users,
  TrendingUp,
  MessageSquare,
  SquarePen,
  ExternalLink,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  add: Plus,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  billing: CreditCard,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  check: Check,
  close: X,
  copy: Copy,
  ellipsis: MoreVertical,
  lineChart: LineChart,
  Gift,
  Eraser,
  History,
  Languages,
  HomeIcon,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        fill="currentColor"
      />
    </svg>
  ),
  help: HelpCircle,
  laptop: Laptop,
  logo: ({ ...props }: LucideProps) => (
    <svg
      id="iconce.com"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <linearGradient
          id="r5"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(45)"
          style={{
            transformOrigin: "center center",
          }}
        >
          <stop stopColor="#5C5C5C" />
          <stop offset={1} stopColor="#0F1015" />
        </linearGradient>
        <radialGradient
          id="r6"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(256) rotate(90) scale(512)"
        >
          <stop stopColor="var(--stop-color)" />
          <stop offset={1} stopColor="var(--stop-color)" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect
        id="r4"
        width={256}
        height={256}
        x={0}
        y={0}
        rx={64}
        fill="url(#r5)"
        stroke="#FFFFFF"
        strokeWidth={0}
        strokeOpacity="100%"
        paintOrder="stroke"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={128}
        height={128}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
        alignmentBaseline="middle"
        x={64}
        y={64}
        {...props}
      >
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
        <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
      </svg>
    </svg>
  ),
  media: Image,
  moon: Moon,
  page: File,
  post: FileText,
  search: Search,
  settings: Settings,
  spinner: Loader2,
  sun: SunMedium,
  trash: Trash,
  CheckIcon: ({ ...props }: LucideProps) => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  CaretSortIcon: ({ ...props }: LucideProps) => (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  twitter: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="twitter"
      role="img"
      {...props}
    >
      <path
        d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"
        fill="currentColor"
      />
    </svg>
  ),
  user: User,
  warning: AlertTriangle,
  PointIcon: ({ ...props }: LucideProps) => (
    <svg
      width={14.5}
      height={14.5}
      viewBox="0 0 14.5 14.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.17947 1.98848C8.17947 1.95929 8.17712 1.9303 8.17242 1.90149C8.16767 1.87269 8.16061 1.84446 8.15124 1.81681C8.1419 1.78916 8.13037 1.76246 8.11664 1.7367C8.10292 1.71094 8.08718 1.68647 8.06943 1.66329C8.05168 1.6401 8.03218 1.61852 8.01093 1.59853C7.98965 1.57855 7.96689 1.56042 7.94265 1.54416C7.91841 1.5279 7.89301 1.51372 7.86646 1.50162C7.8399 1.48952 7.81252 1.47966 7.78432 1.47204C7.75616 1.46442 7.72755 1.45914 7.6985 1.4562C7.66945 1.45327 7.64036 1.45272 7.61124 1.45455C7.58211 1.45638 7.55333 1.46057 7.52488 1.46711C7.49644 1.47366 7.4687 1.48247 7.44168 1.49356C7.4147 1.50465 7.38878 1.51785 7.36394 1.53318C7.33909 1.54851 7.31567 1.56576 7.29368 1.58493C7.27165 1.60409 7.25133 1.62492 7.23272 1.64742C7.21411 1.66991 7.19746 1.69377 7.18278 1.71899L3.43982 8.13547C3.41612 8.17611 3.39808 8.2191 3.38572 8.26449C3.37337 8.30989 3.36711 8.35609 3.36695 8.40314C3.36679 8.4502 3.37273 8.49645 3.38478 8.5419C3.39683 8.5874 3.41457 8.6305 3.43801 8.6713C3.46144 8.7121 3.48976 8.74915 3.52297 8.78246C3.55618 8.81578 3.59315 8.84422 3.63386 8.8678C3.67458 8.89133 3.71766 8.90919 3.7631 8.92138C3.80853 8.93357 3.85477 8.93967 3.90181 8.93967H6.04064V12.6826C6.04063 12.7118 6.04298 12.7408 6.0477 12.7696C6.05244 12.7985 6.0595 12.8266 6.06888 12.8543C6.07821 12.8819 6.08975 12.9087 6.10347 12.9344C6.11719 12.9602 6.13293 12.9846 6.15069 13.0078C6.16844 13.031 6.18793 13.0526 6.20918 13.0726C6.23046 13.0925 6.25322 13.1107 6.27747 13.127C6.3017 13.1432 6.3271 13.1574 6.35366 13.1695C6.38021 13.1816 6.40759 13.1915 6.43579 13.1991C6.46395 13.2067 6.49256 13.2119 6.52161 13.2149C6.55066 13.2178 6.57975 13.2184 6.60888 13.2165C6.638 13.2147 6.66679 13.2106 6.69523 13.204C6.72368 13.1975 6.75141 13.1886 6.77843 13.1776C6.80541 13.1665 6.83133 13.1533 6.85618 13.1379C6.88102 13.1226 6.90444 13.1054 6.92644 13.0862C6.94847 13.067 6.96879 13.0462 6.9874 13.0237C7.006 13.0012 7.02265 12.9773 7.03734 12.9521L10.7803 6.53563C10.804 6.49499 10.822 6.45198 10.8344 6.4066C10.8467 6.36123 10.853 6.31501 10.8532 6.26795C10.8533 6.22091 10.8473 6.17465 10.8353 6.12918C10.8233 6.08371 10.8055 6.04058 10.7821 5.99979C10.7587 5.959 10.7303 5.92195 10.6971 5.88863C10.6639 5.85532 10.6269 5.82687 10.5862 5.80332C10.5455 5.77976 10.5024 5.76189 10.457 5.7497C10.4116 5.7375 10.3653 5.73142 10.3183 5.73143H8.17947V1.98848Z"
        fill="url(#paint0_linear_1992_11)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.17947 1.98848C8.17947 1.95929 8.17712 1.9303 8.17242 1.90149C8.16767 1.87269 8.16061 1.84446 8.15124 1.81681C8.1419 1.78916 8.13037 1.76246 8.11664 1.7367C8.10292 1.71094 8.08718 1.68647 8.06943 1.66329C8.05168 1.6401 8.03218 1.61852 8.01093 1.59853C7.98965 1.57855 7.96689 1.56042 7.94265 1.54416C7.91841 1.5279 7.89301 1.51372 7.86646 1.50162C7.8399 1.48952 7.81252 1.47966 7.78432 1.47204C7.75616 1.46442 7.72755 1.45914 7.6985 1.4562C7.66945 1.45327 7.64036 1.45272 7.61124 1.45455C7.58211 1.45638 7.55333 1.46057 7.52488 1.46711C7.49644 1.47366 7.4687 1.48247 7.44168 1.49356C7.4147 1.50465 7.38878 1.51785 7.36394 1.53318C7.33909 1.54851 7.31567 1.56576 7.29368 1.58493C7.27165 1.60409 7.25133 1.62492 7.23272 1.64742C7.21411 1.66991 7.19746 1.69377 7.18278 1.71899L3.43982 8.13547C3.41612 8.17611 3.39808 8.2191 3.38572 8.26449C3.37337 8.30989 3.36711 8.35609 3.36695 8.40314C3.36679 8.4502 3.37273 8.49645 3.38478 8.5419C3.39683 8.5874 3.41457 8.6305 3.43801 8.6713C3.46144 8.7121 3.48976 8.74915 3.52297 8.78246C3.55618 8.81578 3.59315 8.84422 3.63386 8.8678C3.67458 8.89133 3.71766 8.90919 3.7631 8.92138C3.80853 8.93357 3.85477 8.93967 3.90181 8.93967H6.04064V12.6826C6.04063 12.7118 6.04298 12.7408 6.0477 12.7696C6.05244 12.7985 6.0595 12.8266 6.06888 12.8543C6.07821 12.8819 6.08975 12.9087 6.10347 12.9344C6.11719 12.9602 6.13293 12.9846 6.15069 13.0078C6.16844 13.031 6.18793 13.0526 6.20918 13.0726C6.23046 13.0925 6.25322 13.1107 6.27747 13.127C6.3017 13.1432 6.3271 13.1574 6.35366 13.1695C6.38021 13.1816 6.40759 13.1915 6.43579 13.1991C6.46395 13.2067 6.49256 13.2119 6.52161 13.2149C6.55066 13.2178 6.57975 13.2184 6.60888 13.2165C6.638 13.2147 6.66679 13.2106 6.69523 13.204C6.72368 13.1975 6.75141 13.1886 6.77843 13.1776C6.80541 13.1665 6.83133 13.1533 6.85618 13.1379C6.88102 13.1226 6.90444 13.1054 6.92644 13.0862C6.94847 13.067 6.96879 13.0462 6.9874 13.0237C7.006 13.0012 7.02265 12.9773 7.03734 12.9521L10.7803 6.53563C10.804 6.49499 10.822 6.45198 10.8344 6.4066C10.8467 6.36123 10.853 6.31501 10.8532 6.26795C10.8533 6.22091 10.8473 6.17465 10.8353 6.12918C10.8233 6.08371 10.8055 6.04058 10.7821 5.99979C10.7587 5.959 10.7303 5.92195 10.6971 5.88863C10.6639 5.85532 10.6269 5.82687 10.5862 5.80332C10.5455 5.77976 10.5024 5.76189 10.457 5.7497C10.4116 5.7375 10.3653 5.73142 10.3183 5.73143H8.17947V1.98848Z"
        fill="url(#paint1_linear_1992_11)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.17947 5.38143V1.98848C8.17947 1.95929 8.17712 1.9303 8.17242 1.90149C8.16767 1.87268 8.16061 1.84445 8.15124 1.81681C8.1419 1.78916 8.13037 1.76246 8.11664 1.7367C8.10292 1.71094 8.08718 1.68647 8.06943 1.66329C8.05168 1.6401 8.03218 1.61852 8.01093 1.59853C7.98965 1.57855 7.96689 1.56042 7.94265 1.54416C7.91841 1.5279 7.89301 1.51372 7.86646 1.50162C7.8399 1.48952 7.81252 1.47966 7.78432 1.47204C7.75616 1.46442 7.72755 1.45914 7.6985 1.4562C7.66945 1.45327 7.64036 1.45272 7.61124 1.45455C7.58211 1.45638 7.55333 1.46057 7.52488 1.46711C7.49644 1.47366 7.4687 1.48247 7.44168 1.49356C7.4147 1.50465 7.38878 1.51785 7.36394 1.53318C7.33909 1.54851 7.31567 1.56576 7.29368 1.58493C7.27165 1.60409 7.25133 1.62492 7.23272 1.64742C7.21411 1.66991 7.19746 1.69377 7.18278 1.71899L3.43982 8.13547C3.41612 8.17611 3.39808 8.2191 3.38572 8.26449C3.37337 8.30989 3.36711 8.35609 3.36695 8.40314C3.36679 8.4502 3.37273 8.49645 3.38478 8.5419C3.39683 8.5874 3.41457 8.6305 3.43801 8.6713C3.46144 8.7121 3.48976 8.74915 3.52297 8.78246C3.55618 8.81578 3.59315 8.84422 3.63386 8.8678C3.67458 8.89133 3.71766 8.90919 3.7631 8.92138C3.80853 8.93357 3.85477 8.93967 3.90181 8.93967H6.04064V12.6826C6.04063 12.7118 6.04298 12.7408 6.0477 12.7696C6.05244 12.7985 6.0595 12.8266 6.06888 12.8543C6.07821 12.8819 6.08975 12.9087 6.10347 12.9344C6.11719 12.9602 6.13293 12.9846 6.15069 13.0078C6.16844 13.031 6.18793 13.0526 6.20918 13.0726C6.23046 13.0925 6.25322 13.1107 6.27747 13.127C6.3017 13.1432 6.3271 13.1574 6.35366 13.1695C6.38021 13.1816 6.40759 13.1915 6.43579 13.1991C6.46395 13.2067 6.49256 13.2119 6.52161 13.2149C6.55066 13.2178 6.57975 13.2184 6.60888 13.2165C6.638 13.2147 6.66679 13.2106 6.69523 13.204C6.72368 13.1975 6.75141 13.1886 6.77843 13.1776C6.80541 13.1665 6.83133 13.1533 6.85618 13.1379C6.88102 13.1226 6.90444 13.1054 6.92644 13.0862C6.94847 13.067 6.96879 13.0462 6.9874 13.0237C7.006 13.0012 7.02265 12.9773 7.03734 12.9521L10.7803 6.53563C10.804 6.49499 10.822 6.45198 10.8344 6.4066C10.8467 6.36123 10.853 6.31501 10.8532 6.26795C10.8533 6.22091 10.8473 6.17465 10.8353 6.12918C10.8233 6.08371 10.8055 6.04058 10.7821 5.99979C10.7587 5.959 10.7303 5.92195 10.6971 5.88863C10.6639 5.85532 10.6269 5.82687 10.5862 5.80332C10.5455 5.77976 10.5024 5.76189 10.457 5.7497C10.4116 5.7375 10.3653 5.73142 10.3183 5.73143H8.17947V5.38143ZM7.82699 1.95792C7.82864 1.96804 7.82947 1.97822 7.82947 1.98848V6.08143H10.3184C10.3347 6.08142 10.3506 6.08353 10.3663 6.08775C10.382 6.09196 10.3969 6.09811 10.4109 6.10621C10.425 6.11439 10.4378 6.12422 10.4492 6.1357C10.4607 6.14724 10.4705 6.16003 10.4786 6.17407C10.4867 6.18819 10.4928 6.20307 10.4969 6.21871C10.5011 6.23458 10.5032 6.2506 10.5032 6.26676C10.5031 6.28303 10.501 6.299 10.4967 6.31468C10.4924 6.33028 10.4862 6.34514 10.478 6.35927L6.735 12.7758C6.72989 12.7845 6.7241 12.7928 6.71762 12.8007C6.71128 12.8083 6.70418 12.8156 6.69632 12.8225C6.68892 12.8289 6.68089 12.8348 6.67225 12.8402C6.66372 12.8454 6.65489 12.8499 6.64577 12.8537C6.63631 12.8575 6.62652 12.8606 6.61639 12.863C6.60683 12.8652 6.59684 12.8666 6.58643 12.8673C6.57678 12.8679 6.56692 12.8677 6.55686 12.8667C6.5467 12.8656 6.53667 12.8637 6.52679 12.8611C6.51721 12.8585 6.50781 12.8551 6.4986 12.8509C6.48947 12.8467 6.48088 12.842 6.47282 12.8366C6.46419 12.8308 6.45627 12.8245 6.44905 12.8177C6.44162 12.8107 6.43483 12.8032 6.42868 12.7952C6.42252 12.7871 6.41709 12.7787 6.41239 12.7699C6.40767 12.761 6.40365 12.7516 6.40032 12.7418C6.3971 12.7323 6.39469 12.7227 6.3931 12.7131C6.39146 12.703 6.39064 12.6928 6.39064 12.6826V8.58967H3.90181C3.88553 8.58967 3.86952 8.58756 3.8538 8.58334C3.83803 8.5791 3.82319 8.57297 3.80927 8.56493C3.79515 8.55675 3.78234 8.54689 3.77083 8.53535C3.75937 8.52385 3.74959 8.51106 3.7415 8.49697C3.73339 8.48285 3.72726 8.46793 3.7231 8.45221C3.71894 8.43654 3.71689 8.42058 3.71695 8.40434C3.717 8.38808 3.71916 8.37211 3.72343 8.35643C3.72769 8.34077 3.73393 8.3259 3.74215 8.31182L7.48525 1.89508C7.49028 1.88644 7.496 1.87825 7.5024 1.87051C7.5088 1.86277 7.51588 1.85552 7.52364 1.84878C7.53117 1.84222 7.5392 1.8363 7.54773 1.83104C7.55634 1.82572 7.56528 1.82116 7.57455 1.81736C7.5839 1.81352 7.5935 1.81046 7.60336 1.8082C7.61318 1.80594 7.62313 1.80449 7.6332 1.80386C7.64325 1.80323 7.6533 1.80342 7.66334 1.80443C7.67335 1.80544 7.68325 1.80727 7.69303 1.80992C7.70275 1.81254 7.71218 1.81594 7.72134 1.82012C7.73051 1.8243 7.73928 1.82919 7.74765 1.8348C7.75605 1.84044 7.76387 1.84666 7.7711 1.85344C7.77852 1.86043 7.78533 1.86797 7.79153 1.87606C7.79763 1.88402 7.80303 1.89242 7.80774 1.90125C7.81246 1.91013 7.81647 1.91944 7.81977 1.92919C7.82299 1.93871 7.8254 1.94828 7.82699 1.95792Z"
        fill="url(#paint2_linear_1992_11)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1992_11"
          x1={7.45996}
          y1={2.85413}
          x2={7.45996}
          y2={13.2177}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--stop-color)" />
          <stop offset={1} stopColor="var(--stop-color)" stopOpacity={0.6} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1992_11"
          x1={7.36011}
          y1={11.8629}
          x2={6.03137}
          y2={8.61756}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A664FB" stopOpacity={0.5} />
          <stop offset={1} stopColor="#A664FB" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1992_11"
          x1={6.54941}
          y1={3.34949}
          x2={6.54941}
          y2={12.7543}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--stop-color)" />
          <stop offset={0.5087} stopColor="var(--stop-color)" stopOpacity={0.42} />
          <stop offset={1} stopColor="var(--stop-color)" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
