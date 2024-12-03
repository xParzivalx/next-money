import { InfiniteMovingCards } from "@/components/infinite-moving-cards";

const testimonials = [
  {
    name: "Lucas Grey",
    title: "Customer",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1843079229073981440/pQqZJX5G_400x400.jpg",
    handle: "@ImLucasGrey",
    verified: true,
    quote: "This is so ingenious and good!",
  },
  {
    name: "Patrick Tobler",
    title: "User",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1821352126406127616/We8itUSn_400x400.jpg",
    handle: "@Padierfind",
    verified: true,
    quote: "I love this",
  },
  {
    name: "Ben Tossell",
    title: "Entrepreneur",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1595060668897677314/pHMUc1Zb_400x400.jpg",
    handle: "@bentossell",
    verified: true,
    quote:
      "well, an actually enjoyable way to organise my whole in and out of my business, plus highlighted a bunch of things I need to cancel",
  },
  {
    name: "Christian Alares",
    title: "Developer",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1194368464946974728/1D2biimN_400x400.jpg",
    handle: "@c_alares",
    verified: true,
    quote: "Omg, this is so cool!",
  },
  {
    name: "Zeno Rocha",
    title: "Designer",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1792735373887696896/Nys5Q2b3_400x400.jpg",
    handle: "@zenorocha",
    verified: true,
    quote: "this is absolutely amazing",
  },
  {
    name: "Bailey Simrell",
    title: "Content Creator",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1488962358609330178/tdTC7o6M_400x400.jpg",
    handle: "@baileysimrell",
    verified: true,
    quote: "Awesome man, looks amazing 🔥",
  },
  {
    name: "Darshan Gajara",
    title: "Analyst",
    handle: "@WeirdoWizard",
    verified: false,
    quote: "No sweat! Your smooth integration with banking data blew me away.",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1117472858836434944/FbWce7CZ_400x400.jpg",
  },
  {
    name: "Cal.com",
    title: "Startup",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1839412200760610816/Lce29ADc_400x400.jpg",
    handle: "@calcom",
    verified: true,
    quote: "We love @middayai 🖤",
  },
  {
    name: "Guillermo Rauch",
    title: "CEO",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
    handle: "@rauchg",
    verified: true,
    quote:
      "nice to see @middayai generative ui features built on @vercel AI sdk midday is becoming one of the best OSS @nextjs real-world apps",
  },
  {
    name: "Kyle @ KyTech",
    title: "Tech Enthusiast",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1586538348964978689/nkpJWZxG_400x400.png",
    handle: "@KyTechInc",
    verified: true,
    quote: "so ready! 🙌",
  },
  {
    name: "Steven Tey",
    title: "Entrepreneur",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg",
    handle: "@steventey",
    verified: true,
    quote: `Just found my new favorite open-source project → http://midday.ai

    It's a modern layer on top of Quickbooks/Xero that lets you automate the tedious accounting aspects of your business and focus on what matters – your product.
    
    Built by the 🐐s 
    @pontusab
     + 
    @viktorhofte
     👏`,
  },
  {
    name: "Gokul",
    title: "Developer",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1805103400549318656/EEQpiO7e_400x400.jpg",
    handle: "@KyTechInc",
    verified: true,
    quote: "🖤 Awesome work. just love it.",
  },
  {
    name: "Peer Richelsen — oss/acc",
    title: "Founder",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1816814706000080897/uSIidPHz_400x400.png",
    handle: "@peer_rich",
    verified: true,
    quote:
      "the best thing i couldve done as a founder is build something that helps other founders. so proud 🖤 @middayai",
  },
];

export function Testimonials() {
  return (
    <div className="relative pb-22">
      <h3 className="text-4xl mb-8 font-medium">What people say</h3>
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
    </div>
  );
}