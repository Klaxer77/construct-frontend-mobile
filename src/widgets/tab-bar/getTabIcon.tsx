import { ChatIcon, ObjectIcon, ProfileIcon, VerificationIcon } from "@/widgets/tab-bar/icons";


export const getTabIcon = (routeName: string, isActive: boolean) => {
  const color = isActive ? "#007AFF" : "#919191";
  
  switch (routeName) {
    case "ObjectStack":
      return <ObjectIcon color={color} />;
    case "ChatStack":
      return <ChatIcon color={color} />;
    case "Verifiacation":
      return <VerificationIcon color={color} />;
    case "Profile":
      return <ProfileIcon  color={color} />
    default:
      return null;
  }
};
