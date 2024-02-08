"use client";

import { useEffect, useState } from "react";

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
import stylesStep4 from "./Step4.module.css";
import stylesDesktopLayout from "./DesktopLayout.module.css";
import stylesMobileLayout from "./MobileLayout.module.css";
import Image from "next/image";

const defs = {
  steps: [
    {
      sidebarName: "YOUR INFO",
      title: "Personal info",
      subtitle: "Please provide your name, email address, and phone number.",
      jsx: (
        data: Data,
        setData: () => void,
        setStepIndex: (_: number) => void
      ) => <Step1 data={data} setData={setData} />,
    },
    {
      sidebarName: "SELECT PLAN",
      title: "Select your plan",
      subtitle: "You have the option of monthly or yearly billing.",
      jsx: (
        data: Data,
        setData: () => void,
        setStepIndex: (_: number) => void
      ) => <Step2 data={data} setData={setData} />,
    },
    {
      sidebarName: "ADD-ONS",
      title: "Pick add-ons",
      subtitle: "Add-ons help enhance your gaming experience.",
      jsx: (
        data: Data,
        setData: () => void,
        setStepIndex: (_: number) => void
      ) => <Step3 data={data} setData={setData} />,
    },
    {
      sidebarName: "SUMMARY",
      title: "Finishing up",
      subtitle: "Double-check everything looks OK before confirming.",
      jsx: (
        data: Data,
        setData: () => void,
        setStepIndex: (_: number) => void
      ) => <Step4 data={data} onChangePlan={() => setStepIndex(1)} />,
    },
  ],
  plans: [
    {
      name: "Arcade" as const,
      icon: iconArcade,
      priceMonthly: 9,
    },
    {
      name: "Advanced" as const,
      icon: iconAdvanced,
      priceMonthly: 12,
    },
    {
      name: "Pro" as const,
      icon: iconPro,
      priceMonthly: 15,
    },
  ],
  addOns: [
    {
      name: "Online service" as const,
      description: "Access to multiplayer games",
      priceMonthly: 1,
    },
    {
      name: "Larger storage" as const,
      description: "Extra 1TB of cloud save",
      priceMonthly: 2,
    },
    {
      name: "Customizable profile" as const,
      description: "Custom theme on your profile",
      priceMonthly: 2,
    },
  ],
};
type Data = {
  name: string;
  email: string;
  phone: string;
  plan: (typeof defs.plans)[number]["name"] | undefined;
  addOns: { [Property in (typeof defs.addOns)[number]["name"]]: boolean };
  yearlyBilling: boolean;
};

function SidebarItem({
  title,
  number,
  selected = false,
  onclick,
}: {
  title: string;
  number: number;
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
        {number}
      </div>
      <div className={styles.step}>STEP {number}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

function Step1({ data, setData }: { data: Data; setData: () => void }) {
  let styles = stylesStep1;
  return (
    <div className={styles.inputs}>
      <div>
        <div className={styles.label}>Name</div>
        <input
          className={styles.input}
          onChange={(e) => {
            data.name = e.target.value;
            setData();
          }}
          value={data.name}
          placeholder="e.g. Stephen King"
        ></input>
      </div>
      <div>
        <div className={styles.label}>Email Address</div>
        <input
          className={styles.input}
          onBlur={(e) => {
            data.email = e.target.value;
            setData();
          }}
          value={data.email}
          placeholder="e.g. stephenking@lorem.com"
        ></input>
      </div>
      <div>
        <div className={styles.label}>Phone Number</div>
        <input
          className={styles.input}
          onBlur={(e) => {
            data.phone = e.target.value;
            setData();
          }}
          value={data.phone}
          placeholder="e.g. +1 234 567 890"
        ></input>
      </div>
    </div>
  );
}

function Step2({ data, setData }: { data: Data; setData: () => void }) {
  let styles = stylesStep2;
  return (
    <div className={styles.root}>
      <div className={styles.plans}>
        {defs.plans.map((plan, i) => (
          <div
            key={i}
            className={
              styles.plan +
              (data.plan === plan.name ? " " + styles.selected : "")
            }
            onClick={() => {
              data.plan = data.plan === plan.name ? undefined : plan.name;
              setData();
            }}
          >
            <Image className={styles.icon} src={plan.icon} alt="" />
            <span className={styles.title}>{plan.name}</span>
            <span className={styles.price}>
              {data.yearlyBilling
                ? `$${plan.priceMonthly * 10}/yr`
                : `$${plan.priceMonthly}/mo`}
            </span>
            {data.yearlyBilling ? (
              <span className={styles.nMonthsFree}>2 months free</span>
            ) : null}
          </div>
        ))}
      </div>
      <div
        className={styles.billing}
        onClick={() => {
          data.yearlyBilling = !data.yearlyBilling;
          setData();
        }}
      >
        <span>Monthly</span>
        <div
          className={
            styles.toggle +
            " " +
            (data.yearlyBilling ? styles.right : styles.left)
          }
        >
          {/* <input type="checkbox" /> */}
        </div>
        <span>Yearly</span>
      </div>
    </div>
  );
}

function Step3({ data, setData }: { data: Data; setData: () => void }) {
  let styles = stylesStep3;
  return (
    <div>
      <div>
        {defs.addOns.map(({ name, description, priceMonthly }) => (
          <div
            className={
              styles.addOn + " " + (data.addOns[name] ? styles.checked : "")
            }
            onClick={() => {
              data.addOns[name] = !data.addOns[name];
              setData();
            }}
            key={name}
          >
            <div className={styles.checkbox}>
              <Image src={iconCheckmark} alt="" />
            </div>
            <span className={styles.title}>{name}</span>
            <span className={styles.subtitle}>{description}</span>
            <span className={styles.price}>
              {data.yearlyBilling
                ? `+$${priceMonthly * 10}/yr`
                : `+$${priceMonthly}/mo`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step4({
  data,
  onChangePlan,
}: {
  data: Data;
  onChangePlan: () => void;
}) {
  let plan = defs.plans.find((p) => p.name === data.plan)!;
  let addOns = defs.addOns.filter((addOn) => data.addOns[addOn.name]);
  let totalPriceMonthly =
    plan.priceMonthly +
    addOns.map((addOn) => addOn.priceMonthly).reduce((a, b) => a + b, 0);

  let styles = stylesStep4;
  return (
    <div>
      <div className={styles.box}>
        <div className={styles.plan}>
          <span className={styles.planName}>
            {data.plan} ({data.yearlyBilling ? "Yearly" : "Monthly"})
          </span>
          <span className={styles.changePlan} onClick={onChangePlan}>
            Change
          </span>
          <span className={styles.planPrice}>
            {data.yearlyBilling
              ? `$${plan.priceMonthly * 10}/yr`
              : `$${plan.priceMonthly}/mo`}
          </span>
        </div>
        <hr />
        <div className={styles.addOns}>
          {addOns.length > 0 ? (
            addOns.map((addOn) => {
              return (
                <div className={styles.addOn} key={addOn.name}>
                  <span className={styles.addOnName}>{addOn.name}</span>
                  <span className={styles.addOnPrice}>
                    {data.yearlyBilling
                      ? `+$${addOn.priceMonthly * 10}/yr`
                      : `+$${addOn.priceMonthly}/mo`}
                  </span>
                </div>
              );
            })
          ) : (
            <span className={styles.noAddOns}>No add-ons configured</span>
          )}
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.totalLabel}>
          Total (per {data.yearlyBilling ? "year" : "month"})
        </span>
        <span className={styles.totalPrice}>
          {data.yearlyBilling
            ? `+$${totalPriceMonthly * 10}/yr`
            : `+$${totalPriceMonthly}/mo`}
        </span>
      </div>
    </div>
  );
}

function DesktopLayout({
  stepIndex,
  setStepIndex,
  content,
  navButtons,
}: {
  stepIndex: number;
  setStepIndex: (_: number) => void;
  content: JSX.Element;
  navButtons: JSX.Element;
}) {
  let step = defs.steps[stepIndex];

  let styles = stylesDesktopLayout;
  return (
    <div className={styles.form}>
      <div className={styles.sidebar}>
        {defs.steps.map((step, i) => (
          <SidebarItem
            key={i}
            title={step.sidebarName}
            number={i + 1}
            onclick={() => setStepIndex(i)}
            selected={stepIndex === i}
          />
        ))}
      </div>
      <div className={styles.content}>
        {content}
        <div className={styles.navButtons}>{navButtons}</div>
      </div>
    </div>
  );
}

export default function Card() {
  let [data, setData] = useState<Data>({
    name: "",
    email: "",
    phone: "",
    plan: undefined,
    addOns: {
      "Online service": false,
      "Larger storage": false,
      "Customizable profile": false,
    },
    yearlyBilling: false,
  });

  let [stepIndex, setStepIndex] = useState(0);
  let step = defs.steps[stepIndex];

  let styles = stylesCard;
  return (
    <DesktopLayout
      stepIndex={stepIndex}
      setStepIndex={setStepIndex}
      content={
        <div className={styles.content}>
          <div>
            <h1>{step.title}</h1>
            <span>{step.subtitle}</span>
          </div>
          {defs.steps[stepIndex].jsx(
            data,
            () => setData({ ...data }),
            setStepIndex
          )}
        </div>
      }
      navButtons={
        <div className={styles.navButtons}>
          {stepIndex !== 1 ? (
            <div
              className={styles.prevStep}
              onClick={() => setStepIndex(stepIndex)}
            >
              Go Back
            </div>
          ) : null}
          {stepIndex !== 4 ? (
            <div
              className={styles.nextStep}
              onClick={() => setStepIndex(stepIndex + 1)}
            >
              Next Step
            </div>
          ) : (
            <div className={styles.confirm} onClick={() => alert("woohoo!")}>
              Confirm
            </div>
          )}
        </div>
      }
    />
  );
}
