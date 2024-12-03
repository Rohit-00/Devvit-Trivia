import { Devvit } from '@devvit/public-api';


// Define the prop types for the ModalButton component
interface ModalButtonProps {
  label: string;
  background: string;
  textColor: string;
  onClick: () => void; // Function that handles the button click
}

// ModalButton component with type safety
export const ModalButton = ({ label, background, textColor, onClick }:ModalButtonProps) => {
  return (
    <hstack width="100px" height="40px" alignment="middle center">
      <zstack alignment="start top">
        {/* Shadow */}
        <vstack width="100%" height="100%">
          <spacer height="3px" />
          <hstack width="100%" height="100%">
            <spacer width="2px" />
            <hstack height="30px" width="90px" backgroundColor="black" cornerRadius="full" />
          </hstack>
        </vstack>
        <hstack
          width="90px"
          height="30px"
          backgroundColor={background}
          cornerRadius="full"
          alignment="middle center"
          borderColor="black"
          border="thick"
          onPress={onClick}
        >
          <text color={textColor} size="large" weight="bold">
            {label}
          </text>
        </hstack>
      </zstack>
    </hstack>
  );
};
