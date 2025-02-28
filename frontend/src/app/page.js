import { fetchProfileAction } from "@/actions";
import HomepageButtonControls from "@/components/homepage-button-controls";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import ChatbotPopup from "./assistant/page.js";
import { Linkedin, Twitter, Instagram, Youtube, Facebook } from "lucide-react";

async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <Fragment>
      <section className="relative w-full pt-20 pb-20 lg:pt-32 lg:pb-32 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <section className="w-full lg:w-1/2 text-center lg:text-left">
              <span className="block text-lg font-semibold tracking-wide uppercase text-yellow-500">
                A Platform for Meaningful Impact
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold mt-4 leading-tight">
                Connect. Volunteer. Transform Lives.
              </h1>
              <p className="mt-6 text-lg text-gray-800 dark:text-gray-400">
                Join hands with NGOs that need your skills and passion. Whether it's 
                mentoring, fundraising, or on-ground support—make a difference, your way.
              </p>
              <div className="flex flex-row lg:flex-col mt-8 justify-center lg:justify-start gap-4">
                <HomepageButtonControls user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} />
              </div>
            </section>
            <section className="relative w-full lg:w-1/2 flex justify-center">
              <img src="/Volunteer.jpg" alt="Volunteering" className="w-full h-auto object-cover shadow-lg rounded-lg" />
            </section>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl font-bold">What We Offer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <div className="p-6 shadow-lg rounded-lg dark:bg-gray-800">
              <h3 className="font-semibold mb-3">✅ Effortless Volunteer Matching</h3>
              <p className="text-gray-700 dark:text-gray-400">Find opportunities that match your skills and passion.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg dark:bg-gray-800">
              <h3 className="font-semibold mb-3">✅ Flexible Contribution</h3>
              <p className="text-gray-700 dark:text-gray-400">Volunteer based on your availability and expertise.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg dark:bg-gray-800">
              <h3 className="font-semibold mb-3">✅ Exclusive NGO Events & Workshops</h3>
              <p className="text-gray-700 dark:text-gray-400">Get access to impactful social initiatives.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-4xl font-bold">Why Choose Hand2Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 text-left">
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-black">
              <h3 className="text-xl font-bold mb-3">📌 For NGOs</h3>
              <ul className="list-disc ml-5 text-gray-700 dark:text-gray-400">
                <li><strong>Streamlined Volunteer Management</strong> – Post opportunities and engage with verified volunteers.</li>
                <li><strong>Event Promotion & Collaboration</strong> – Showcase events and attract supporters.</li>
                <li><strong>Impact Tracking</strong> – View volunteer contributions and progress reports.</li>
              </ul>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-black">
              <h3 className="text-xl font-bold mb-3">📌 For Volunteers</h3>
              <ul className="list-disc ml-5 text-gray-700 dark:text-gray-400">
                <li><strong>Discover Meaningful Opportunities</strong> – Find causes that align with your interests.</li>
                <li><strong>Flexible Commitment</strong> – Contribute at your convenience, whether remote or in-person.</li>
                <li><strong>Recognition & Growth</strong> – Earn certificates, recommendation letters, and professional benefits.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-4xl font-bold">🗓️ Upcoming NGO Events</h2>
          <p className="text-gray-700  dark:text-gray-500 mt-4">Stay updated and register for impactful events hosted by NGOs.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            <div className="p-6 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800">
              <h3 className="text-xl font-bold">🎓 Education Drive</h3>
              <p className="text-gray-700 dark:text-gray-500">March 5, 2025</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800">
              <h3 className="text-xl font-bold">🌍 Clean & Green Mission</h3>
              <p className="text-gray-700 dark:text-gray-500">March 10, 2025</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800">
              <h3 className="text-xl font-bold">❤️ Healthcare Awareness</h3>
              <p className="text-gray-700 dark:text-gray-500">March 20, 2025</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800">
              <h3 className="text-xl font-bold">🏆 Women Empowerment</h3>
              <p className="text-gray-700 dark:text-gray-500">March 30, 2025</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-4xl font-bold">Impact So Far!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-black">
              <h3 className="text-xl font-bold">10,000+ Volunteers Engaged</h3>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-black">
              <h3 className="text-xl font-bold">500+ NGOs Actively Hiring Volunteers</h3>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-black">
              <h3 className="text-xl font-bold">100+ Social Events Hosted</h3>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-black">
              <h3 className="text-xl font-bold">20,000+ Hours of Community Service</h3>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-black">
              <h3 className="text-xl font-bold">95% Volunteer Satisfaction Rate</h3>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-black">
              <h3 className="text-xl font-bold">95% Volunteer Satisfaction Rate</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 dark:bg-black text-center">
        <h2 className="text-4xl font-bold ">🌍 Join the Movement!</h2>
        <p className="text-lg mt-10">📌 Hand2Help is more than just a platform – it’s a community of changemakers!</p>
        <p className="text-lg mt-2">📌 Ready to Make a Difference?</p>
        <button className="mt-6 px-6 py-3 bg-black dark:bg-white dark:text-black text-white font-bold  rounded-lg">Sign Up Now</button>
      </section>
      
      
      <section className="py-10 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6 lg:px-16 text-center">
        <h2 className="text-4xl font-bold">📞 Contact Us</h2>
        <p className="text-lg mt-4 text-gray-700 dark:text-gray-400">
          Have questions? Want to collaborate? Reach out to us!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          {/* Contact Form */}
          <form className="p-6 bg-white dark:bg-black shadow-lg rounded-lg">
            <div className="mb-4">
              <label className="block text-left font-semibold">Name</label>
              <input type="text" className="w-full mt-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white" placeholder="Your Name" required />
            </div>
            <div className="mb-4">
              <label className="block text-left font-semibold">Email</label>
              <input type="email" className="w-full mt-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white" placeholder="Your Email" required />
            </div>
            <div className="mb-4">
              <label className="block text-left font-semibold">Message</label>
              <textarea className="w-full mt-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="w-full mt-4 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-yellow-400">
              Send Message
            </button>
          </form>

          {/* Contact Details & Social Media */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white dark:bg-black shadow-lg p-6 rounded-lg w-full text-center">
              <h3 className="text-xl font-bold">📧 Email Us</h3>
              <p className="text-gray-700 dark:text-gray-400 mt-6">support@hand2help.org</p>
            </div>

            <div className="bg-white dark:bg-black shadow-lg p-6 rounded-lg w-full text-center mt-6">
              <h3 className="text-xl font-bold">📞 Call Us</h3>
              <p className="text-gray-700 dark:text-gray-400 mt-6">+1 234 567 890</p>
            </div>

            <div className="bg-white dark:bg-black shadow-lg p-6 rounded-lg w-full text-center mt-6">
              <h3 className="text-xl font-bold">🌍 Connect With Us</h3>
              <div className="flex justify-center gap-6 mt-10">
                <a href="#" className="text-blue-800 hover:scale-110 transition">
                  <Linkedin size={28} />
                </a>
                <a href="#" className="text-blue-500 hover:scale-110 transition">
                  <Twitter size={28} />
                </a>
                <a href="#" className="text-pink-600 hover:scale-110 transition">
                  <Instagram size={28} />
                </a>
                <a href="#" className="text-red-600 hover:scale-110 transition">
                  <Youtube size={28} />
                </a>
                <a href="#" className="text-blue-700 hover:scale-110 transition">
                  <Facebook size={28} />
                </a>
              </div>
            </div>


            <div className="mt-6 flex gap-6">
              <a href="#" className="text-2xl text-blue-500 hover:text-blue-400">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-2xl text-blue-400 hover:text-blue-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-2xl text-pink-500 hover:text-pink-400">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      </section>
    <ChatbotPopup /> {/* Add chatbot here */}
    </Fragment>
  );
}

export default Home;