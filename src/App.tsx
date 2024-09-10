import React from 'react';

import Address from '@/components/Address/Address';
import AddressBook from '@/components/AddressBook/AddressBook';
import Button from '@/components/Button/Button';
import Radio from '@/components/Radio/Radio';
import Section from '@/components/Section/Section';
import useAddressBook from '@/hooks/useAddressBook';
import useFormFields from '@/hooks/useFormFields';

import { Address as AddressType } from './types';
import Form from '@/components/Form/Form';
import Error from '@/components/Error/Error';

function App() {
    const initialFormValues = {
        postCode: '',
        houseNumber: '',
        firstName: '',
        lastName: '',
        selectedAddress: '',
    };
    const { fields, handleChange, resetFields } =
        useFormFields(initialFormValues);
    /**
     * Results states
     */
    const [error, setError] = React.useState<undefined | string>(undefined);
    const [addresses, setAddresses] = React.useState<AddressType[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    /**
     * Redux actions
     */
    const { addAddress } = useAddressBook();

    /**
     * Handle form submission for address search.
     * Fetch addresses from the backend and update state.
     * @param e - The form submit event.
     */
    const handleAddressSubmit = async (
        e: React.ChangeEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLoading(true);
        setAddresses([]);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=${fields.postCode}&streetnumber=${fields.houseNumber}`
            );
            const data = await response.json();
            if (response.ok) {
                const transformedAddresses = data.details
                    .map((address: AddressType) => ({
                        ...address,
                        houseNumber: fields.houseNumber,
                    }))
                    .filter(
                        (
                            item: AddressType,
                            index: number,
                            self: AddressType[]
                        ) =>
                            self.findIndex(
                                (address: AddressType) =>
                                    address.city === item.city &&
                                    address.street === item.street
                            ) === index
                    );
                setAddresses(transformedAddresses);
                setError('');
            } else {
                setError('No addresses found!');
            }
        } catch (error) {
            setError('An error occurred while fetching addresses.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle form submission for adding personal info to the selected address.
     * Validates fields and adds address to address book.
     * @param e - The form submit event.
     */
    const handlePersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fields.firstName || !fields.lastName) {
            setError('First name and last name fields mandatory!');
            return;
        }

        if (!fields.selectedAddress || !addresses.length) {
            setError(
                "No address selected, try to select an address or find one if you haven't"
            );
            return;
        }

        const foundAddress = addresses.find(
            (address) => address.id === fields.selectedAddress
        );

        if (!foundAddress) {
            setError('Selected address not found');
            return;
        }

        addAddress({
            ...foundAddress,
            firstName: fields.firstName,
            lastName: fields.lastName,
        });

        setError('');
    };

    return (
        <main>
            <Section>
                <h1>
                    Create your own address book!
                    <br />
                    <small>
                        Enter an address by postcode add personal info and done!
                        👏
                    </small>
                </h1>
                <Form
                    label='🏠 Find an address'
                    loading={loading}
                    formEntries={[
                        {
                            name: 'postCode',
                            placeholder: 'Post Code',
                            extraProps: {
                                value: fields.postCode,
                                onChange: handleChange,
                            },
                        },
                        {
                            name: 'houseNumber',
                            placeholder: 'House number',
                            extraProps: {
                                value: fields.houseNumber,
                                onChange: handleChange,
                            },
                        },
                    ]}
                    onFormSubmit={handleAddressSubmit}
                    submitText='Find'
                ></Form>
                {addresses.length > 0 &&
                    addresses.map((address, index) => {
                        return (
                            <Radio
                                name='selectedAddress'
                                id={address.id}
                                key={index}
                                onChange={() =>
                                    handleChange({
                                        target: {
                                            name: 'selectedAddress',
                                            value: address.id,
                                        },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }
                            >
                                <Address {...address} />
                            </Radio>
                        );
                    })}
                {fields.selectedAddress && (
                    <Form
                        label='✏️ Add personal info to address'
                        loading={loading}
                        formEntries={[
                            {
                                name: 'firstName',
                                placeholder: 'First name',
                                extraProps: {
                                    value: fields.firstName,
                                    onChange: handleChange,
                                },
                            },
                            {
                                name: 'lastName',
                                placeholder: 'Last name',
                                extraProps: {
                                    value: fields.lastName,
                                    onChange: handleChange,
                                },
                            },
                        ]}
                        onFormSubmit={handlePersonSubmit}
                        submitText='Add to addressbook'
                    ></Form>
                )}

                {error && <Error>{error}</Error>}

                <Button
                    type='button'
                    variant='secondary'
                    onClick={() => {
                        resetFields();
                        setAddresses([]);
                        setError(undefined);
                    }}
                >
                    Clear all fields
                </Button>
            </Section>

            <Section variant='dark'>
                <AddressBook />
            </Section>
        </main>
    );
}

export default App;
