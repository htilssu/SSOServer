import React, {useEffect, useState} from 'react';
import {Combobox, ComboboxProps, InputBase, useCombobox} from "@mantine/core";
import {Service} from "@prisma/client";
import {IconSearch, IconTriangleInvertedFilled} from "@tabler/icons-react";

interface ServiceCombobox extends ComboboxProps {
    services: Service[],
    setService: (serviceId: string) => void
    currentService: string
}

const PartnerCombobox = ({services, setService, currentService, ...props}: ServiceCombobox) => {

    const comboboxStore = useCombobox({
        onDropdownClose: () => comboboxStore.resetSelectedOption(),
    });


    const [search, setSearch] = useState('');
    const [serviceName, setServiceName] = useState('')
    const [comboBoxOptions, setComboBoxOptions] = useState<React.JSX.Element[]>([])
    useEffect(() => {
        if (currentService) {
            //get service name by currentId
            setServiceName(services.find(value => value.id === currentService)?.name || '')
        }
    }, [currentService, services]);

    useEffect(() => { //search service
        setComboBoxOptions(services
            .filter(service => service.name.toLowerCase().includes(search.toLowerCase().trim()))
            .map((service) => (
                <Combobox.Option key={service.id} value={service.id}>
                    {service.name}
                </Combobox.Option>
            )));
    }, [search, services]);

    function onComboboxSubmit(value: string) {
        setService(value); //set partner id
        comboboxStore.closeDropdown();
    }


    return (
        // @ts-ignore
        <Combobox {...props} value={serviceName} store={comboboxStore} onOptionSubmit={onComboboxSubmit}>
            <Combobox.Target>
                <InputBase value={serviceName} type={"button"}
                           pointer
                           size={props.size} placeholder={"Chọn service đăng ký"}
                           onClick={() => {
                               comboboxStore.openDropdown();
                           }}
                           leftSection={<IconTriangleInvertedFilled size={16}/>}/>
            </Combobox.Target>
            <Combobox.Dropdown>
                <Combobox.Search
                    value={search}
                    rightSection={<IconSearch size={16}/>}
                    onChange={(event) => setSearch(event.target.value as string)}
                    placeholder="Tìm kiếm service"
                />
                <Combobox.Options>
                    {comboBoxOptions.length === 0 && (
                        <Combobox.Empty>
                            Không tìm thấy service
                        </Combobox.Empty>
                    )}
                    {comboBoxOptions}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default PartnerCombobox;