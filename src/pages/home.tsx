import { Navigation } from "@/components/navigation";
import { Chatbot } from "@/components/chatbot";
import { ContactForm } from "@/components/contact-form";
import { ChatbotFloat } from "@/components/chatbot";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/AI jpgs_1753893664637.png";
import courseImage from "@assets/WhatsApp Image 2025-09-24 at 10.50.21_1758714120381.jpeg";
import { 
  TrendingUp, 
  Users, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  ShoppingCart, 
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Link,
  Twitter,
  Facebook,
  Bot,
  Check,
  ExternalLink,
  GraduationCap
} from "lucide-react";

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleGetStarted = () => {
    scrollToSection("contact");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onGetStarted={handleGetStarted} />
      
      {/* Hero Image Section */}
      <section className="relative">
        <div 
          className="h-96 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`
          }}
        ></div>
      </section>

      {/* Hero Text Section */}
      <section id="home" className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-primary">
              Transform Your Business with{" "}
              <span className="text-accent">AI Agents</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 leading-relaxed">
              Empower your business with cutting-edge AI solutions. 
              Automate processes, enhance customer service, and drive growth with intelligent agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="bg-primary text-white hover:bg-primary-dark transform hover:scale-105 transition-all duration-200 text-lg font-semibold px-8 py-4"
              >
                Start Free Consultation
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("services")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 text-lg font-semibold px-8 py-4"
              >
                View Our Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral mb-4">Why Choose iLove AI?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in creating AI agents tailored for businesses worldwide, 
              understanding diverse market needs and regulatory requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Increase Efficiency</h3>
                <p className="text-gray-600">Automate repetitive tasks and free up your team to focus on strategic initiatives.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">24/7 Customer Support</h3>
                <p className="text-gray-600">Provide round-the-clock assistance to your customers with intelligent chatbots.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Custom Solutions</h3>
                <p className="text-gray-600">Tailored AI agents designed specifically for your industry and business needs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral mb-4">Our AI Agent Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI services designed to transform how businesses operate and serve their customers worldwide.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white p-3 rounded-lg">
                    <MessageSquare className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Customer Service Agents</h3>
                    <p className="text-gray-600 mb-4">
                      Intelligent chatbots that handle customer inquiries, process orders, and provide support in multiple languages worldwide.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Natural language processing</li>
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Multi-language support</li>
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />CRM integration</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white p-3 rounded-lg">
                    <BarChart3 className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Business Intelligence Agents</h3>
                    <p className="text-gray-600 mb-4">
                      AI-powered analytics that provide insights, generate reports, and help make data-driven decisions.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Real-time analytics</li>
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Predictive modeling</li>
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Custom dashboards</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 text-white p-3 rounded-lg">
                    <ShoppingCart className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">E-commerce Agents</h3>
                    <p className="text-gray-600 mb-4">
                      Personalized shopping assistants that recommend products, process orders, and handle inventory management.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Product recommendations</li>
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Order processing</li>
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Inventory tracking</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 text-white p-3 rounded-lg">
                    <Briefcase className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Process Automation Agents</h3>
                    <p className="text-gray-600 mb-4">
                      Streamline workflows, automate document processing, and handle routine administrative tasks.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Workflow automation</li>
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Document processing</li>
                      <li className="flex items-center"><Check className="text-green-500 mr-2" size={16} />Task scheduling</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive AI Chatbot Demo */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral mb-4">Experience Our AI in Action</h2>
            <p className="text-xl text-gray-600">Try our interactive business consultation chatbot below</p>
          </div>
          
          <Chatbot embedded />
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how businesses worldwide are thriving with our AI solutions</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300" 
                alt="Modern retail store interior" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Global Retail Chain</h3>
                <p className="text-gray-600 mb-4">
                  Increased customer satisfaction by 45% and reduced response time by 80% with our AI customer service agents.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-semibold">+45% Satisfaction</span>
                  <Button variant="link" className="text-primary hover:text-blue-700 font-medium p-0">
                    Read Case Study →
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <img 
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300" 
                alt="Modern manufacturing facility" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">International Manufacturing</h3>
                <p className="text-gray-600 mb-4">
                  Automated quality control processes and reduced operational costs by 30% with intelligent process agents.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-semibold">-30% Costs</span>
                  <Button variant="link" className="text-primary hover:text-blue-700 font-medium p-0">
                    Read Case Study →
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300" 
                alt="Modern financial services office" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Global Financial Services</h3>
                <p className="text-gray-600 mb-4">
                  Streamlined loan processing and improved decision-making speed by 60% with AI-powered analytics.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-semibold">+60% Speed</span>
                  <Button variant="link" className="text-primary hover:text-blue-700 font-medium p-0">
                    Read Case Study →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral mb-6">About iLove AI</h2>
              <p className="text-lg text-gray-600 mb-6">
                We are a leading AI solutions provider, specializing in creating intelligent agents 
                that understand the unique challenges and opportunities of diverse global markets.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team combines deep technical expertise with global market knowledge to deliver AI solutions 
                that drive real business results. From innovative startups to large enterprises, 
                we're transforming how businesses operate worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">150+</div>
                  <div className="text-gray-600">Clients Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">300+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
              
              <Button className="bg-primary text-white hover:bg-blue-700">
                Learn More About Our Team
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Diverse team of professionals collaborating" 
                className="rounded-xl shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent opacity-20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Hear from business leaders worldwide who've transformed with AI</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-accent text-lg">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "iLove AI transformed our customer service completely. Our response times improved dramatically, 
                  and customer satisfaction scores are at an all-time high."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Professional headshot" 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">Sarah Mitchell</div>
                    <div className="text-gray-600 text-sm">CEO, Global Retail Group</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-accent text-lg">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The process automation agents have saved us countless hours. We can now focus on strategic 
                  growth while the AI handles routine operations seamlessly."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Professional headshot" 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">David Mokgethi</div>
                    <div className="text-gray-600 text-sm">Operations Director, JHB Manufacturing</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-accent text-lg">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Working with iLove AI was a game-changer. Their understanding of the local market and 
                  technical expertise delivered results beyond our expectations."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full mr-4 bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                    PN
                  </div>
                  <div>
                    <div className="font-semibold">Priya Naidoo</div>
                    <div className="text-gray-600 text-sm">CTO, International FinTech Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Courses Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral mb-4">Free Professional Development</h2>
            <p className="text-xl text-gray-600">Enhance your skills with these excellent free courses</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={courseImage}
                alt="Professional development courses"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <GraduationCap className="text-primary text-4xl mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Level Up Your Career</h3>
                <p className="text-gray-600 mb-8">
                  Take advantage of these free professional courses to enhance your skills and advance your career in technology.
                </p>
              </div>
              
              <div className="space-y-4">
                <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-2">Microsoft Elevate Women in Tech</h4>
                        <p className="text-gray-600 text-sm">Free resources and training for women in technology</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://microsoft.elevatewomenin.tech/', '_blank')}
                        data-testid="button-microsoft-course"
                        className="hover:bg-primary hover:text-white"
                      >
                        <ExternalLink className="mr-2" size={16} />
                        Visit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-2">AWS Skill Builder</h4>
                        <p className="text-gray-600 text-sm">Free cloud computing courses and certifications from Amazon</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://skillbuilder.aws/?trk=ef4c585e-78b9-415c-81af-088d547a755d&sc_channel=el', '_blank')}
                        data-testid="button-aws-course"
                        className="hover:bg-primary hover:text-white"
                      >
                        <ExternalLink className="mr-2" size={16} />
                        Visit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-600">Get in touch for a free consultation and discover how AI can drive your success</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            
            <div>
              <Card className="p-8">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-500 text-white p-3 rounded-lg">
                        <MapPin />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Our Locations</h4>
                        <p className="text-gray-600">Wembley Square, Gardens, Cape Town</p>
                        <p className="text-gray-600">Serving businesses worldwide</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-500 text-white p-3 rounded-lg">
                        <Phone />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Phone</h4>
                        <p className="text-gray-600">+27 (0) 21 123 4567</p>
                        <p className="text-gray-600">Monday - Friday, 24/7 Global Support</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-500 text-white p-3 rounded-lg">
                        <Mail />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-gray-600">hello@ilove-ai.co.za</p>
                        <p className="text-gray-600">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-500 text-white p-3 rounded-lg">
                        <Clock />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Response Time</h4>
                        <p className="text-gray-600">Free consultation within 48 hours</p>
                        <p className="text-gray-600">Custom proposals within 1 week</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                        <Link />
                      </Button>
                      <Button size="icon" className="bg-blue-400 hover:bg-blue-500">
                        <Twitter />
                      </Button>
                      <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                        <Facebook />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-white py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="text-primary text-2xl" />
                <span className="text-2xl font-bold">iLove AI</span>
              </div>
              <p className="text-gray-300 mb-4">
                Transforming businesses worldwide with intelligent AI agents and automation solutions.
              </p>
              <div className="flex space-x-4">
                <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                  <Link />
                </Button>
                <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                  <Twitter />
                </Button>
                <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                  <Facebook />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">Customer Service Agents</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">Business Intelligence</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">E-commerce Solutions</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">Process Automation</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">About Us</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">Case Studies</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">Careers</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">Contact</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">Privacy Policy</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">Terms of Service</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">Data Protection</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">POPIA Compliance</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 iLove AI. All rights reserved. | Serving Businesses Worldwide
            </p>
          </div>
        </div>
      </footer>

      <ChatbotFloat />
    </div>
  );
}
