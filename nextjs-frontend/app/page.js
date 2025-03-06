"use client";

import { Button } from "@/components/ui/button";
import Typed from "typed.js";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth(); // Get user info from AuthContext
  const el = useRef(null);
  const [data, setData] = useState([]);
  const [response, setBlog] = useState();

  useEffect(() => {
    document.title = "My Blog post";
    fetchData();
  }, [user]);

  useEffect(() => {
    if (data.length === 0) return;

    const typed = new Typed(el.current, {
      strings: data,
      typeSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [data]);

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt");
      const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
      
      //const url2 = "http://localhost:1337/api/hometext";

      // const [dataRes, textRes] = await Promise.all([
      //   fetch(url, { headers, cache: "no-store" }),
      //   // fetch(url2, { headers, cache: "no-store" }),
      // ]);

      
      //const responseText = await textRes.json();

      if (user?.Gender) {
        const userGender = user.Gender;
        const url = `http://localhost:1337/api/articles?populate=*&filters[$or][0][restrictedTo][$eq]=${userGender}&filters[$or][1][restrictedTo][$eq]=All`;

        const res = await fetch(url, { headers, cache: "no-store" });
        const responseData = await res.json();
        setBlog(responseData.data);
      } else {
        // If no user is logged in, show no articles
        setBlog([]);
      }

      // setBlog(responseData);
      //setData(responseText?.data?.text?.split(",") || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            <span className="font-semibold">My name is</span> CMS-Zing
            <br className="hidden lg:block" />I work with ZingHR
            <span className="font-semibold underline decoration-primary">
              <span ref={el} />
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Confused on which course to take? I have got you covered. Browse blogs and find out!
          </p>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="tailwind css components"
            className="w-full h-full max-w-md mx-auto"
          />
        </div>
      </section>

      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
          <Link href={`/blog`}><h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Top Blogs</h2></Link>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Check out our most popular blog posts</p>
          </div>
          <div className="flex flex-wrap justify-center">
            {response?.map((data) => (
              <div key={data.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105">
                  <img
                    src={`http://localhost:1337${data.cover.url}`}
                    alt={data.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{data.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {data.description.split(" ").length > 6
                        ? data.description.split(" ").slice(0, 10).join(" ") + "..."
                        : data.description}
                    </p>
                    <Link href={`/blogpost/${data.slug}`}>
                      <Button className="m-2" variant="outline">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
