import { Container, HelpCircle, LayersTwo01, LogOut01, Settings01, User01 } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/store/hook";

export default function DropdownAvatar () {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [name,setName] = useState<string | null>(null);
    const storeUser = useAppSelector(state => state.user);
    useEffect(() => {
        if(storeUser){
            setName(storeUser.name);
            setAvatar(storeUser.avatar);
        }
    },[storeUser])
    return (
        <Dropdown.Root>
            <AriaButton
                className={({ isPressed, isFocusVisible }) =>
                    cx("group relative inline-flex cursor-pointer rounded-full outline-focus-ring", (isPressed || isFocusVisible) && "outline-2 outline-offset-2")
                }
            >
                {avatar ? (
                    <img
                        src={avatar}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full object-cover shadow-md"
                    />
                ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300" />
                )}
            </AriaButton>

            <Dropdown.Popover
                className=" backdrop-blur-xs bg-transparent"
                style={{

                }}
            >
            <div className="flex gap-3 p-3">
                {name}
            </div>
                <Dropdown.Menu>
                    <Dropdown.Section>
                        <Dropdown.Item addon="⌘K->P" icon={User01}>
                            View profile
                        </Dropdown.Item>
                        <Dropdown.Item addon="⌘S" icon={Settings01}>
                            Settings
                        </Dropdown.Item>
                    </Dropdown.Section>
                    <Dropdown.Separator />
                    <Dropdown.Section>
                        <Dropdown.Item icon={LayersTwo01}>Changelog</Dropdown.Item>
                        <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
                        <Dropdown.Item icon={Container}>API</Dropdown.Item>
                    </Dropdown.Section>
                    <Dropdown.Separator />
                    <Dropdown.Section>
                        <Dropdown.Item addon="⌥⇧Q" icon={LogOut01}>
                            Log out
                        </Dropdown.Item>
                    </Dropdown.Section>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
}
