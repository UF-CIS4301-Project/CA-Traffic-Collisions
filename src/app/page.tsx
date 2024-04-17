"use client";

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import WelcomeBar from "./components/ui/welcome-bar";
import DataSetButton from "./components/ui/DataSetButton";
import SideNav from "./components/ui/sidenav";
import axios from 'axios';

function IndexPage() {
  const datasets = [
    { key: "one", value: "random" },
    { key: "two", value: "random" },
    { key: "three", value: "random" },
    { key: "four", value: "random" },
  ];

  let numTuples: number = 0;
  const [selectedTuples, setSelectedTuples] = useState(numTuples);
  const [loading, setLoading] = useState(false);

  return (
    <main>
      {/* homepage content */}
      <h1 className="font-bold text-3xl mb-2">Home</h1>
      <br />
      <div className="p-10 text-justify rounded shadow-lg bg-white">
        Welcome Spiel - Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Delectus, et sint nulla beatae non eveniet accusantium ratione
        velit corrupti labore odio quam voluptatum recusandae culpa quae
        nesciunt corporis. Architecto, asperiores? Lorem ipsum dolor sit amet
        consectetur adipisicing elit.
        <br />
        <br />
        Click
        <button className="cursor hover:uppercase"
          onClick={() => {
            setLoading(true);
            axios.get('http://localhost:5000/api/metadata')
              .then(response => {
                setSelectedTuples(response.data[4]["NUM_TUPLES"]);
                setLoading(false);
              })
              .catch(error => {
                setLoading(false);
                console.error(error);
              })

          }} >
          &nbsp;here&nbsp;
        </button>
        for total number of tuples in
        database: {loading ? <>Loading...</> : <>{selectedTuples.toLocaleString()}</>}
      </div>
      <div className="text-center my-10 text-3xl">
        Feel free to explore the datasets we used
      </div>
      {/* Box components which describe and link to each of our datasets - currently just holds dummy data/text  */}
      <div className="flex flex-rows justify-evenly">
        {datasets.map((set) => (
          <Link href="" key={set.key}>
            <DataSetButton
              title="The Coldest Sunset"
              body="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, et sint nulla beatae non eveniet accusantium ratione velit corrupti labore odio "
              imageSource="/favicon.ico"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default IndexPage;
