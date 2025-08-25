import * as Dialog from "@radix-ui/react-dialog"

export default function Choices() {
  return (
    <Dialog.Root>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title></Dialog.Title>
          <Dialog.Description></Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}