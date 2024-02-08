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
import Image from "next/image";

const defs = {
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
  plan: (typeof defs.plans)[number]["name"];
  addOns: { [Property in (typeof defs.addOns)[number]["name"]]: boolean };
  yearlyBilling: boolean;
};

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

function Step2({
  plan,
  setPlan,
  yearlyBilling,
  setYearlyBilling,
}: {
  plan: Data["plan"];
  setPlan: (_: Data["plan"]) => void;
  yearlyBilling: boolean;
  setYearlyBilling: (_: boolean) => void;
}) {
  let styles = stylesStep2;
  return (
    <div className={styles.root}>
      <div className={styles.plans}>
        <div
          className={
            styles.plan + " " + (plan === "Arcade" ? styles.selected : "")
          }
          onClick={() => setPlan("Arcade")}
        >
          <Image className={styles.icon} src={iconArcade} alt="" />
          <span className={styles.title}>Arcade</span>
          <span className={styles.price}>
            {yearlyBilling ? "$90/yr" : "$9/mo"}
          </span>
          {yearlyBilling ? (
            <span className={styles.nMonthsFree}>2 months free</span>
          ) : null}
        </div>
        <div
          className={
            styles.plan + " " + (plan === "Advanced" ? styles.selected : "")
          }
          onClick={() => setPlan("Advanced")}
        >
          <Image className={styles.icon} src={iconAdvanced} alt="" />
          <span className={styles.title}>Advanced</span>
          <span className={styles.price}>
            {yearlyBilling ? "$120/yr" : "$12/mo"}
          </span>
          {yearlyBilling ? (
            <span className={styles.nMonthsFree}>2 months free</span>
          ) : null}
        </div>
        <div
          className={
            styles.plan + " " + (plan === "Pro" ? styles.selected : "")
          }
          onClick={() => setPlan("Pro")}
        >
          <Image className={styles.icon} src={iconPro} alt="" />
          <span className={styles.title}>Pro</span>
          <span className={styles.price}>
            {yearlyBilling ? "$150/yr" : "$15/mo"}
          </span>
          {yearlyBilling ? (
            <span className={styles.nMonthsFree}>2 months free</span>
          ) : null}
        </div>
      </div>
      <div
        className={styles.billing}
        onClick={() => setYearlyBilling(!yearlyBilling)}
      >
        <span>Monthly</span>
        <div
          className={
            styles.toggle + " " + (yearlyBilling ? styles.right : styles.left)
          }
        >
          {/* <input type="checkbox" /> */}
        </div>
        <span>Yearly</span>
      </div>
    </div>
  );
}

function Step3({
  yearlyBilling,
  addOnsSelected,
  setAddOnsSelected,
}: {
  yearlyBilling: boolean;
  addOnsSelected: Data["addOns"];
  setAddOnsSelected: () => void;
}) {
  let styles = stylesStep3;
  return (
    <div>
      <div>
        {defs.addOns.map(({ name, description, priceMonthly }) => (
          <div
            className={
              styles.addOn + " " + (addOnsSelected[name] ? styles.checked : "")
            }
            onClick={() => {
              addOnsSelected[name] = !addOnsSelected[name];
              setAddOnsSelected();
            }}
            key={name}
          >
            <div className={styles.checkbox}>
              <Image src={iconCheckmark} alt="" />
            </div>
            <span className={styles.title}>{name}</span>
            <span className={styles.subtitle}>{description}</span>
            <span className={styles.price}>
              {yearlyBilling
                ? `+$${priceMonthly * 10}/yr`
                : `+$${priceMonthly}/mo`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step4({ data }: { data: Data }) {
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
          <span className={styles.changePlan}>Change</span>
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

export default function Card() {
  let [data, setData] = useState<Data>({
    name: "",
    email: "",
    phone: "",
    plan: "Arcade",
    addOns: {
      "Online service": false,
      "Larger storage": false,
      "Customizable profile": false,
    },
    yearlyBilling: false,
  });

  let [step, setStep] = useState(1);

  let styles = stylesCard;
  return (
    <div className={styles.form}>
      <div className={styles.sidebar}>
        {["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"].map((title, i) => (
          <SidebarItem
            key={i}
            title={title}
            index={i + 1}
            onclick={() => setStep(i + 1)}
            selected={step === i + 1}
          />
        ))}
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
        {[
          () => <Step1 data={data} setData={() => setData({ ...data })} />,
          () => (
            <Step2
              plan={data.plan}
              setPlan={(plan) => {
                data.plan = plan;
                setData({ ...data });
              }}
              yearlyBilling={data.yearlyBilling}
              setYearlyBilling={(value) => {
                data.yearlyBilling = value;
                setData({ ...data });
              }}
            />
          ),
          () => (
            <Step3
              yearlyBilling={data.yearlyBilling}
              addOnsSelected={data.addOns}
              setAddOnsSelected={() => {
                setData({ ...data });
              }}
            />
          ),
          () => <Step4 data={data} />,
        ][step - 1]()}
        <div className={styles.navButtons}>
          {step !== 1 ? (
            <div className={styles.prevStep} onClick={() => setStep(step - 1)}>
              Go Back
            </div>
          ) : null}
          {step !== 4 ? (
            <div className={styles.nextStep} onClick={() => setStep(step + 1)}>
              Next Step
            </div>
          ) : (
            <div className={styles.confirm} onClick={() => alert("woohoo!")}>
              Confirm
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
