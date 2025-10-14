import Link from "next/link";
import { Button } from "@/components/styles/ui/button";
import { Input } from "@/components/styles/ui/input";

export default function Footer() {
  return (
    <footer className="bg-[#2F7173] text-white py-12 border-t border-white/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-wider z-10 text-white group">
              <div className="relative inline-block">
                <span className="inline-block transform -rotate-3 transition-transform duration-300 group-hover:rotate-0">
                  Learn
                </span>
                <span className="inline-block text-cyan-300 transform rotate-3 transition-transform duration-300 group-hover:rotate-0">
                  oria
                </span>
                {/* <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></div> */}
              </div>
            </Link>
            <p className="text-sm opacity-90 max-w-md my-2">
              The best teams use Learnoria so they can deeply understand their audience and move in the right direction - faster.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Discover", "Contact Us", "Events", "Offers"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="font-semibold mb-4">Subscribe</h3>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
