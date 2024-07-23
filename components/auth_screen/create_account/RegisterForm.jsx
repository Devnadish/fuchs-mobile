import { Button, Dimensions, Text, View } from "react-native";

import React, { useRef, useState } from "react";
import Input from "../../shared/Input";
import FormContainer from "../../shared/FormContainer";
import { citys } from "../../../constants/City";
import Dropdown from "../../shared/DropDown";
import { colors } from "../../../constants";
import Bsheet from "../../shared/Bheet";
import ModelSheet from "../../shared/ModelSheet";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

const formattedCountries = citys.map((c) => ({
  value: c.label,
  label: `${c.flag} ${c.label}`,
}));

export default function RegisterForm() {
  const [name, setName] = useState("");

  return (
    <>
      <FormContainer>
        {/* <Bsheet ref={cityModelSheet} title={"Select Your City"} />
         */}

        <Input
          label="Name"
          placeholder="Enter Name"
          text={name}
          setText={setName}
        />
        <Input label="Mobile" placeholder="Enter Mobile" />
        <Input label="E-mail" placeholder="Enter Email" />
        {/* <Input label="City" placeholder="Select City" /> */}
        <Dropdown
          data={formattedCountries}
          onChange={console.log}
          placeholder="Select city"
        />
        <Input label="Password" placeholder="Enter Password" />
      </FormContainer>
    </>
  );
}
