const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <div className="py-16 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-b from-gray-100 to-white mt-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 py-12 border-b border-gray-400/20">
        <div className="max-w-xs">
          <h2 className="font-extrabold text-3xl text-gray-900 tracking-tight">
            FreshCart
          </h2>
          <p className="text-sm md:text-base mt-3 text-gray-600 leading-relaxed">
            Discover freshness, quality & convenience with fast grocery delivery
            at your doorstep.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-orange-500 hover:text-white transition cursor-pointer">
              <i className="fa-brands fa-instagram text-lg"></i>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-orange-500 hover:text-white transition cursor-pointer">
              <i className="fa-brands fa-twitter text-lg"></i>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-orange-500 hover:text-white transition cursor-pointer">
              <i className="fa-brands fa-facebook text-lg"></i>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-orange-500 hover:text-white transition cursor-pointer">
              <i className="fa-brands fa-youtube text-lg"></i>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-10">
          {linkSections.map((section, index) => (
            <div key={index} className="min-w-[140px]">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-orange-600 hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-5 text-center text-gray-600 text-sm md:text-base">
        Copyright 2025 ©
        <a
          href="https://prebuiltui.com"
          className="text-orange-600 font-medium hover:underline ml-1"
        >
          PrebuiltUI
        </a>{" "}
        All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
