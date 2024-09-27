import React from 'react';
import {Combobox, Input, InputBase, useCombobox} from "@mantine/core";
import {Service} from "@prisma/client";
import {IconTriangleInvertedFilled} from "@tabler/icons-react";

interface ServiceCombobox {
    services: Service[],
    setService: (serviceId: string) => void
}

const PartnerCombobox = ({services, setService}: ServiceCombobox) => {
    const comboboxStore = useCombobox({
        onDropdownClose: () => comboboxStore.resetSelectedOption(),
    });

    const comboBoxOptions = services.map((service) => (
        <Combobox.Option key={service.id} value={service.idNumber.toString()}>
            {service.name}
        </Combobox.Option>
    ));

    function onComboboxSubmit(value: string) {
        setService(value); //set partner id
        comboboxStore.closeDropdown();
    }


    return (
        <Combobox store={comboboxStore} onOptionSubmit={onComboboxSubmit}>
            <Combobox.Target>
                <InputBase onClick={() => {
                    comboboxStore.openDropdown();
                }}
                           leftSection={<IconTriangleInvertedFilled size={16}/>}>
                    <Input.Placeholder>Pick value</Input.Placeholder>
                </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown>
                <Combobox.Options>
                    {comboBoxOptions}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default PartnerCombobox;