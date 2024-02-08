"use client";

import { useState } from "react";

import iconArcade from "./images/icon-arcade.svg";
import iconAdvanced from "./images/icon-advanced.svg";
import iconPro from "./images/icon-pro.svg";
import iconCheckmark from "./images/icon-checkmark.svg";
import iconThankYou from "./images/icon-thank-you.svg";

import stylesCard from "./Card.module.css";
import stylesSidebarItem from "./SidebarItem.module.css";
import stylesStep1 from "./Step1.module.css";
import stylesStep2 from "./Step2.module.css";
import stylesStep3 from "./Step3.module.css";
import Image from "next/image";

function SidebarItem({
  title,
  index,
  selected = false,
  onclick,
}: {
  title: string;
  index: number;
  selected?: boolean;
  onclick: () => void;
}) {
  let styles = stylesSidebarItem;
  return (
    <div className={styles.sidebarItem} onClick={onclick}>
      <div
        className={
          styles.number + " " + (selected ? styles.numberSelected : "")
        }
      >
        {index}
      </div>
      <div className={styles.step}>STEP {index}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

function Step1() {
  let styles = stylesStep1;
  return (
    <div className={styles.inputs}>
      <div>
        <div className={styles.label}>Name</div>
        <input className={styles.input} placeholder="e.g. Stephen King"></input>
      </div>
      <div>
        <div className={styles.label}>Email Address</div>
        <input
          className={styles.input}
          placeholder="e.g. stephenking@lorem.com"
        ></input>
      </div>
      <div>
        <div className={styles.label}>Phone Number</div>
        <input
          className={styles.input}
          placeholder="e.g. +1 234 567 890"
        ></input>
      </div>
    </div>
  );
}

function Step2() {
  let [selected, setSelected] = useState(
    "arcade" as "arcade" | "advanced" | "pro"
  );
  let [yearly, setYearly] = useState(false);

  function PlanCard({
    identifier,
    icon,
    title,
    priceMonthly,
  }: {
    identifier: "arcade" | "advanced" | "pro";
    icon: string;
    title: string;
    priceMonthly: number;
  }) {
    return (
      <div
        className={
          styles.plan + " " + (selected === identifier ? styles.selected : "")
        }
        onClick={() => setSelected(identifier)}
      >
        <Image className={styles.icon} src={icon} alt="" />
        <span className={styles.title}>{title}</span>
        <span className={styles.price}>
          {yearly ? `${priceMonthly * 10}/yr` : `${priceMonthly}/mo`}
        </span>
        {yearly ? (
          <span className={styles.nMonthsFree}>2 months free</span>
        ) : null}
      </div>
    );
  }

  let styles = stylesStep2;
  return (
    <div className={styles.root}>
      <div className={styles.plans}>
        <PlanCard
          identifier="arcade"
          title="Arcade"
          icon={iconArcade}
          priceMonthly={9}
        />
        <PlanCard
          identifier="advanced"
          title="Advanced"
          icon={iconAdvanced}
          priceMonthly={12}
        />
        <PlanCard
          identifier="pro"
          title="Pro"
          icon={iconPro}
          priceMonthly={15}
        />
      </div>
      <div className={styles.billing} onClick={() => setYearly(!yearly)}>
        <span>Monthly</span>
        <div
          className={
            styles.toggle + " " + (yearly ? styles.right : styles.left)
          }
        >
          {/* <input type="checkbox" /> */}
        </div>
        <span>Yearly</span>
      </div>
    </div>
  );
}

function Step3() {
  let styles = stylesStep3;
  return (
    <div>
      <div>
        {[
          {
            title: "Online service",
            subtitle: "Access to multiplayer games",
            priceMonthly: 1,
            checked: true,
          },
          {
            title: "Larger storage",
            subtitle: "Extra 1TB of cloud save",
            priceMonthly: 2,
            checked: true,
          },
          {
            title: "Customizable profile",
            subtitle: "Custom theme on your profile",
            priceMonthly: 2,
            checked: false,
          },
        ].map(({ title, subtitle, priceMonthly, checked }, i) => (
          <div
            className={styles.addOn + " " + (checked ? styles.checked : "")}
            key={i}
          >
            {/* <input className={styles.checkbox} type="checkbox" /> */}
            <div className={styles.checkbox}>
              <Image src={iconCheckmark} alt="" />
            </div>
            <span className={styles.title}>{title}</span>
            <span className={styles.subtitle}>{subtitle}</span>
            <span className={styles.price}>+${priceMonthly}/mo</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step4() {
  return <div></div>;
}

export default function Card() {
  let [step, setStep] = useState(1 as 1 | 2 | 3 | 4);

  let styles = stylesCard;
  return (
    <div className={styles.form}>
      <div className={styles.sidebar}>
        <SidebarItem
          title={"YOUR INFO"}
          index={1}
          onclick={() => setStep(1)}
          selected={step === 1}
        />
        <SidebarItem
          title={"SELECT PLAN"}
          index={2}
          onclick={() => setStep(2)}
          selected={step === 2}
        />
        <SidebarItem
          title={"ADD-ONS"}
          index={3}
          onclick={() => setStep(3)}
          selected={step === 3}
        />
        <SidebarItem
          title={"SUMMARY"}
          index={4}
          onclick={() => setStep(4)}
          selected={step === 4}
        />
      </div>
      <div className={styles.content}>
        <div>
          <h1>
            {
              [
                "Personal info",
                "Select your plan",
                "Pick add-ons",
                "Finishing up",
              ][step - 1]
            }
          </h1>
          <span>
            {
              [
                "Please provide your name, email address, and phone number.",
                "You have the option of monthly or yearly billing.",
                "Add-ons help enhance your gaming experience.",
                "Double-check everything looks OK before confirming.",
              ][step - 1]
            }
          </span>
        </div>
        {[() => <Step1 />, () => <Step2 />, () => <Step3 />, () => <Step4 />][
          step - 1
        ]()}
        <div className={styles.nextStep} onClick={() => setStep(step + 1)}>
          Next Step
        </div>
      </div>
    </div>
  );
}
