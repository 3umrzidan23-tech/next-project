import userImage from "../../../images/userImage.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

type DropdownMenuBasicProps = {
  Logout: () => void;
};

export function DropdownMenuBasic({ Logout }: DropdownMenuBasicProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image alt="user" width={30} height={30} src={userImage} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a href="/profile">Profile</a>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={Logout} className="cursor-pointer">
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}