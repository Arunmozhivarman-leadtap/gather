import SubscriptionForm from "./SubscriptionForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-teal flex flex-col items-center justify-center px-6 py-20 text-white selection:bg-brand-green/30">
      <div className="max-w-3xl w-full text-center space-y-10 animate-in fade-in duration-1000 slide-in-from-bottom-4">

        {/* Logo Section */}
        <div className="flex justify-center mb-0">
          <Image
            src="/logo-white.png"
            alt="Gather Logo"
            width={350}
            height={130}
            className="h-auto w-auto max-w-[240px] md:max-w-[350px]"
            priority
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-linen font-normal">
            Something good is gathering.
          </h2>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-brand-linen/90 font-normal leading-relaxed">
            We&apos;re building a simple way for people to come together.<br />
            To share moments, ideas, and purpose in real life.
          </p>
          <p className="text-xl md:text-2xl text-brand-linen/90 font-normal leading-relaxed">
            Because when we gather, communities grow stronger, kinder, and a little happier.
          </p>
        </div>

        <div className="pt-8">
          <p className="text-lg italic text-brand-green/80 font-normal mb-10 max-w-lg mx-auto leading-relaxed">
            What brings you to Gather? Tell us how you&apos;d like to participate to receive tailored updates on our local launch.
          </p>

          <SubscriptionForm />
        </div>
      </div>


    </div>
  );
}
