# Auth Component

## Support form method

You can add others into:  
`/components/User/Auth/Auth/IBaseFormMethods.ts`

Don't forget set the state  
`const [authAction, setAuthAction] = useRecoilState(authActionState)`

All logic fellow the state, view the form component file that you can find the code details.

## Add a new form

1. Set the method name, you should add the name into the `IBaseFormMethods`, and `setAuthAction` first.
2. Set the form validation and submit method, follow the blow file easily.
3. Finally, render the component with `BaseForm`.

## About the components

* The base form(`/components/Base/Input`, `/components/Base/Form`) which supports the basic method, no business code
  needs to be added.
* Business code pls put into the `/components/User/Auth` folder.

## About the file name

* State(Recoil): R*States
* Interface: I*(FunctionName: Props, Methods etc...)

## Note

### Form validation rules

`/components/User/Auth/Auth/BaseFormRule.ts`

### Form submit method

`/components/User/Auth/Auth/BaseFormModal.ts`


