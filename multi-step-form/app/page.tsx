"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
import stylesStepFinal from "./StepFinal.module.css";
import stylesDesktopLayout from "./DesktopLayout.module.css";
import stylesMobileLayout from "./MobileLayout.module.css";
import stylesSelectableCard from "./SelectableCard.module.css";
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
        setStepIndex: (_: number) => void,
        mobileLayout: boolean
      ) => (
        <Step1 data={data} setData={setData} submit={() => setStepIndex(1)} />
      ),
    },
    {
      sidebarName: "SELECT PLAN",
      title: "Select your plan",
      subtitle: "You have the option of monthly or yearly billing.",
      jsx: (
        data: Data,
        setData: () => void,
        setStepIndex: (_: number) => void,
        mobileLayout: boolean
      ) => <Step2 data={data} setData={setData} mobileLayout={mobileLayout} />,
    },
    {
      sidebarName: "ADD-ONS",
      title: "Pick add-ons",
      subtitle: "Add-ons help enhance your gaming experience.",
      jsx: (
        data: Data,
        setData: () => void,
        setStepIndex: (_: number) => void,
        mobileLayout: boolean
      ) => <Step3 data={data} setData={setData} />,
    },
    {
      sidebarName: "SUMMARY",
      title: "Finishing up",
      subtitle: "Double-check everything looks OK before confirming.",
      jsx: (
        data: Data,
        setData: () => void,
        setStepIndex: (_: number) => void,
        mobileLayout: boolean
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

  step1DisplayValidation: boolean;
  step2DisplayValidation: boolean;
  thankYouScreen: boolean;
};

function SidebarItem({
  title,
  number,
  selected = false,
  numberOnly = false,
  onclick,
}: {
  title: string;
  number: number;
  selected?: boolean;
  numberOnly?: boolean;
  onclick: () => void;
}) {
  let styles = stylesSidebarItem;
  return (
    <button className={styles.sidebarItem} onClick={onclick}>
      <div
        className={
          styles.number + (selected ? " " + styles.numberSelected : "")
        }
      >
        {number}
      </div>
      {numberOnly ? null : (
        <div className={styles.description}>
          <div className={styles.step}>STEP {number}</div>
          <div className={styles.title}>{title}</div>
        </div>
      )}
    </button>
  );
}

type Step1Errors = { name?: string; email?: string; phone?: string };

function checkStep1Errors({ data }: { data: Data }) {
  let errors: Step1Errors = {};

  if (data.name.length === 0) {
    errors.name = "This field is required";
  }

  if (data.email.length === 0) {
    errors.email = "This field is required";
  } else if (
    // Regex credit: https://stackoverflow.com/a/48800/9946772
    data.email.match(/^\S+@\S+$/) === null
  ) {
    errors.email = "Please enter a valid email address";
  }

  if (data.phone.length === 0) {
    errors.phone = "This field is required";
  } else if (
    // Regex credit: myself
    data.phone.match(/^\+?[0-9 ()-]{5,20}$/) === null
  ) {
    errors.phone = "Please enter a valid phone number";
  }

  return errors;
}

function Step1({
  data,
  setData,
  submit,
}: {
  data: Data;
  setData: () => void;
  submit: () => void;
}) {
  let errors = data.step1DisplayValidation ? checkStep1Errors({ data }) : {};
  let inputs = [
    {
      label: "Name",
      placeholder: "e.g. Stephen King",
      getter: data.name,
      setter: (x: string) => (data.name = x),
      error: errors.name,
      inputRef: useRef<HTMLInputElement>(null),
    },
    {
      label: "Email Address",
      placeholder: "e.g. stephenking@lorem.com",
      getter: data.email,
      setter: (x: string) => (data.email = x),
      error: errors.email,
      inputRef: useRef(null),
    },
    {
      label: "Phone Number",
      placeholder: "e.g. +1 234 567 890",
      getter: data.phone,
      setter: (x: string) => (data.phone = x),
      error: errors.phone,
      inputRef: useRef(null),
    },
  ];

  let styles = stylesStep1;
  return (
    <div className={styles.inputs}>
      {inputs.map(
        ({ label, placeholder, getter, setter, error, inputRef }, i) => (
          <div
            key={label}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.ctrlKey || inputs[i + 1] === undefined) {
                  submit();
                } else {
                  inputs[i + 1].inputRef.current?.select();
                }
              }
            }}
          >
            <div className={styles.label}>{label}</div>
            <span
              className={
                styles.validation +
                (data.step1DisplayValidation
                  ? " " + (error ? styles.error : styles.ok)
                  : "")
              }
            >
              {/* {data.step1DisplayValidation ? error ?? "Ok" : ""} */}
              {data.step1DisplayValidation ? error ?? "" : ""}
            </span>
            <input
              ref={inputRef}
              className={styles.input + (error ? " " + styles.isError : "")}
              onChange={(e) => {
                setter(e.target.value);
                setData();
              }}
              value={getter}
              placeholder={placeholder}
            ></input>
          </div>
        )
      )}
    </div>
  );
}

function Step2({
  data,
  setData,
  mobileLayout,
}: {
  data: Data;
  setData: () => void;
  mobileLayout: boolean;
}) {
  let styles = stylesStep2;
  return (
    <div className={styles.root}>
      <div
        className={
          styles.validation +
          (data.step2DisplayValidation && data.plan === undefined
            ? " " + styles.visible
            : "")
        }
      >
        Please select a plan
      </div>
      <div
        className={styles.plans + (mobileLayout ? " " + styles.vertical : "")}
      >
        {defs.plans.map((plan, i) => (
          <button
            key={i}
            className={
              styles.plan +
              (" " + stylesSelectableCard.root) +
              (data.plan === plan.name
                ? " " + stylesSelectableCard.selected
                : "")
            }
            onClick={() => {
              data.plan = data.plan === plan.name ? undefined : plan.name;
              setData();
            }}
          >
            <Image className={styles.icon} src={plan.icon} alt="" />
            <div className={styles.texts}>
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
          </button>
        ))}
      </div>
      <div
        className={styles.billing}
        onClick={() => {
          data.yearlyBilling = !data.yearlyBilling;
          setData();
        }}
      >
        <span className={data.yearlyBilling ? "" : styles.selected}>
          Monthly
        </span>
        <div
          className={
            styles.toggle +
            " " +
            (data.yearlyBilling ? styles.right : styles.left)
          }
        >
          {/* <input type="checkbox" /> */}
        </div>
        <span className={data.yearlyBilling ? styles.selected : ""}>
          Yearly
        </span>
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
          <button
            className={
              styles.addOn +
              (" " + stylesSelectableCard.root) +
              (data.addOns[name]
                ? " " + styles.checked + (" " + stylesSelectableCard.selected)
                : "")
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
          </button>
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
          <button className={styles.changePlan} onClick={onChangePlan}>
            Change
          </button>
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
            ? `$${totalPriceMonthly * 10}/yr`
            : `$${totalPriceMonthly}/mo`}
        </span>
      </div>
    </div>
  );
}

function StepFinal() {
  let styles = stylesStepFinal;
  return (
    <div className={styles.root}>
      <Image className={styles.icon} src={iconThankYou} alt="" />
      <h1 className={styles.header}>Thank you!</h1>
      <p className={styles.text}>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
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
  navButtons?: JSX.Element;
}) {
  let step = defs.steps[stepIndex];

  let styles = stylesDesktopLayout;
  return (
    <div className={styles.root}>
      <div className={styles.card}>
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
          {navButtons ? (
            <div className={styles.navButtons}>{navButtons}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MobileLayout({
  stepIndex,
  setStepIndex,
  content,
  navButtons,
}: {
  stepIndex: number;
  setStepIndex: (_: number) => void;
  content: JSX.Element;
  navButtons?: JSX.Element;
}) {
  let step = defs.steps[stepIndex];

  let styles = stylesMobileLayout;
  return (
    <div className={styles.root}>
      <div className={styles.sidebarBackground}>
        <Image src="./multi-step-form/bg-sidebar-mobile.svg" fill alt="" />
      </div>
      <div className={styles.sidebar}>
        {defs.steps.map((step, i) => (
          <SidebarItem
            key={i}
            title={step.sidebarName}
            number={i + 1}
            numberOnly
            onclick={() => setStepIndex(i)}
            selected={stepIndex === i}
          />
        ))}
      </div>
      <div className={styles.card}>{content}</div>
      {navButtons ? <div className={styles.bottomBar}>{navButtons}</div> : null}
    </div>
  );
}

// https://stackoverflow.com/a/19014495/9946772
function useWindowSize() {
  // Use a desktop-like size so that SSR HTML doesn't jump around for desktop user majority
  const [size, setSize] = useState<[number, number]>([1920, 1080]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function useStepIndex({
  data,
  setData,
  initialStep,
}: {
  data: Data;
  setData: () => void;
  initialStep: number;
}) {
  let [stepIndex, setStepIndex] = useState(initialStep);
  let setStepIndexIfValidates = (targetIndex: number) => {
    for (let i = stepIndex; i < targetIndex; i++) {
      if (i === 0) {
        if (Object.keys(checkStep1Errors({ data })).length > 0) {
          data.step1DisplayValidation = true;
          setData();
          setStepIndex(i);
          return;
        }
      } else if (i === 1) {
        if (data.plan === undefined) {
          data.step2DisplayValidation = true;
          setData();
          setStepIndex(i);
          return;
        }
      }
    }

    if (stepIndex === 0) data.step1DisplayValidation = false;
    else if (stepIndex === 1) data.step2DisplayValidation = false;
    setStepIndex(targetIndex);
  };
  return [stepIndex, setStepIndexIfValidates] as const;
}

export default function Card() {
  let [data, setData] = useState<Data>({
    // name: "ur mom",
    // email: "brian@cia.gov",
    // phone: "+12345",
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

    step1DisplayValidation: false,
    step2DisplayValidation: false,
    thankYouScreen: false,
  });

  let mobileLayout = useWindowSize()[0] < 800;

  let [stepIndex, setStepIndex] = useStepIndex({
    data,
    setData: () => setData({ ...data }),
    initialStep: 0,
  });
  let step = defs.steps[stepIndex];

  let styles = stylesCard;
  let layout = mobileLayout ? MobileLayout : DesktopLayout;
  if (data.thankYouScreen) {
    return layout({
      stepIndex,
      setStepIndex: () => {},
      content: <StepFinal />,
      navButtons: undefined,
    });
  }
  return layout({
    stepIndex,
    setStepIndex,
    content: (
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{step.title}</h1>
          <span className={styles.subtitle}>{step.subtitle}</span>
        </div>
        {defs.steps[stepIndex].jsx(
          data,
          () => setData({ ...data }),
          setStepIndex,
          mobileLayout
        )}
      </div>
    ),
    navButtons: (
      <div className={styles.navButtons}>
        {stepIndex !== 0 ? (
          <button
            className={styles.prevStep}
            onClick={() => setStepIndex(stepIndex - 1)}
          >
            Go Back
          </button>
        ) : null}
        {stepIndex !== 3 ? (
          <button
            className={styles.nextStep}
            onClick={() => setStepIndex(stepIndex + 1)}
          >
            Next Step
          </button>
        ) : (
          <button
            className={styles.confirm}
            onClick={() => {
              data.thankYouScreen = true;
              setData({ ...data });
            }}
          >
            Confirm
          </button>
        )}
      </div>
    ),
  });
}
