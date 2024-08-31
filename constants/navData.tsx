import { ThemedText } from "@/components/ThemedText";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ReactElement } from "react";

interface IconElementProps {
  size: number;
  color: string;
  focused: boolean;
}

type IconElement = (props?: IconElementProps) => ReactElement;

interface NavDataProps {
  id: number;
  backgroundColor?: string;
  borderColor?: string;
  label?: string;
  onPress?: () => void;
  icon: IconElement | ReactElement;
}
export const navData: NavDataProps[] = [
  {
    id: 1,
    backgroundColor: "#a871f0",
    borderColor: "#a871f0",
    label: "Fifteen",
    onPress: () => alert("HEY"),
    icon: () => {
      return (
        <>
          <ThemedText type="subtitle" darkColor="violet" lightColor="violet">
            15
          </ThemedText>
          <AntDesign name="plus" size={10} color="violet" />
        </>
      );
    },
  },
  {
    id: 2,
    onPress: () => alert("HEY"),
    label: "Label 2",
    icon: (
      <ThemedText
        style={{
          color: "orange",
          fontSize: 25,
          lineHeight: 30,
          fontWeight: "bold",
        }}
      >
        BH
      </ThemedText>
    ),
  },
  {
    id: 3,
    label: "Doctors",
    icon: <FontAwesome6 name="user-doctor" size={30} color="#a871f0" />,
  },
  {
    id: 4,
    label: "Response",
    icon: <FontAwesome5 name="running" size={30} color="#a871f0" />,
  },
  {
    id: 5,
    label: "Medicines",
    icon: <Fontisto name="test-bottle" size={30} color="#34ebb7" />,
  },
  {
    id: 6,
    label: "Notes",
    icon: <FontAwesome5 name="notes-medical" size={30} color="#da62f0" />,
  },
  {
    id: 7,
    label: "Patients",
    icon: <Fontisto name="bed-patient" size={30} color="black" />,
  },
  {
    id: 8,
    label: "Label 4",
    icon: <AntDesign name="addusergroup" size={30} color="#34ebb7" />,
  },
  {
    id: 9,
    label: "Messages",
    icon: <AntDesign name="wechat" size={30} color="#34ebb7" />,
  },
  {
    id: 10,
    label: "Label 5",
    icon: <MaterialCommunityIcons name="brain" size={30} color="violet" />,
  },
  {
    id: 11,
    label: "Label 6",
    onPress: () => alert("HEY"),
    icon: (
      <ThemedText
        style={{
          color: "green",
          fontSize: 25,
          lineHeight: 30,
          fontWeight: "bold",
        }}
      >
        IBH
      </ThemedText>
    ),
  },
  {
    id: 12,
    label: "Equipments",
    icon: <MaterialCommunityIcons name="medical-bag" size={30} color="red" />,
  },
];
