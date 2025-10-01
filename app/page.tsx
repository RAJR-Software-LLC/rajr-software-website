"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Code,
  Users,
  Zap,
  Shield,
  Globe,
  Mail,
  MapPin,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  role="img"
                  aria-label="R logo"
                >
                  <defs>
                    <linearGradient id="g" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2F3731" />
                      <stop offset="50%" stopColor="#556B2F" />
                      <stop offset="100%" stopColor="#C1A15B" />
                    </linearGradient>
                  </defs>

                  <rect
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    rx="8"
                    ry="8"
                    fill="url(#g)"
                  />

                  <text
                    x="50%"
                    y="50%"
                    fill="#FFFFFF"
                    fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                    fontWeight="700"
                    fontSize="18"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    R
                  </text>
                </svg>
              </div>
              <span className="font-semibold text-lg">RAJR Software LLC</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </a>
              <a
                href="#values"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Values
              </a>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Family-Owned Business
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">
                Custom Software Solutions for{" "}
                <span className="text-primary">Growing Organizations</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
                We deliver thoughtful, high-quality software development and
                consulting services tailored to each client&apos;s unique needs.
                Building long-term relationships grounded in trust,
                collaboration, and technical excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button> */}
              </div>
            </div>
            <div className="relative">
              <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    rajrsoftware.com
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-primary/20 rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-secondary/20 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              About RAJR Software LLC
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              A forward-thinking software development company specializing in
              delivering high-quality, scalable, and tailored software
              solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Client-Focused</h3>
              <p className="text-muted-foreground">
                We work closely with clients as true partners, understanding
                your unique challenges and goals.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Zap className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation-Driven</h3>
              <p className="text-muted-foreground">
                Constantly exploring new technologies and approaches to deliver
                cutting-edge solutions.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">
                Delivering solutions that exceed expectations with transparent
                and ethical practices.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Comprehensive software development services designed to meet
              diverse client needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <Code className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Custom Software Development
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Web applications, internal tools, and APIs built to your
                specifications.
              </p>
              {/* <Button variant="ghost" size="sm" className="p-0 h-auto">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Button> */}
            </Card>
            <Card className="p-6">
              <Globe className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Consulting & Strategy
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Technical strategy, architecture review, and scalability
                planning.
              </p>
              {/* <Button variant="ghost" size="sm" className="p-0 h-auto">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Button> */}
            </Card>
            <Card className="p-6">
              <Shield className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ongoing Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Retainers for continuous improvements, updates, and
                troubleshooting.
              </p>
              {/* <Button variant="ghost" size="sm" className="p-0 h-auto">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Button> */}
            </Card>
            <Card className="p-6">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Integration & Automation
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Streamlining workflows and connecting disparate systems
                efficiently.
              </p>
              {/* <Button variant="ghost" size="sm" className="p-0 h-auto">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Button> */}
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              The principles that guide every project and client relationship.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Integrity",
                desc: "Transparent and ethical practices in every engagement.",
              },
              {
                title: "Innovation",
                desc: "Constantly exploring new technologies and approaches.",
              },
              {
                title: "Collaboration",
                desc: "Working closely with clients as true partners.",
              },
              {
                title: "Quality",
                desc: "Delivering solutions that exceed expectations.",
              },
              {
                title: "Adaptability",
                desc: "Agile and responsive to client needs and evolving markets.",
              },
            ].map((value, index) => (
              <Card key={index} className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Ready to Transform Your Business with Custom Software?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Let&apos;s discuss how we can help you harness the power of
            technology to solve complex challenges efficiently and innovatively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Mail className="w-5 h-5 mr-2" />
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Phone className="w-5 h-5 mr-2" />
              Schedule a Call
            </Button> */}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Ready to start your project? Get in touch and let&apos;s discuss
              how we can help transform your business.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    R
                  </span>
                </div>
                <span className="font-semibold text-lg">RAJR Software LLC</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering organizations to harness the power of technology to
                solve complex challenges efficiently and innovatively.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Custom Software Development</li>
                <li>Consulting & Strategy</li>
                <li>Ongoing Support & Maintenance</li>
                <li>Integration & Automation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@rajrsoftware.com</span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Schedule a consultation</span>
                </div> */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Serving businesses nationwide</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 RAJR Software LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
