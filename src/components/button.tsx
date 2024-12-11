import { Devvit } from '@devvit/public-api';


// Define the prop types for the Button component
interface ButtonProps {
  label: string;
  background: string;
  textColor: string;
  onClick?: () => void; // Function that handles the button click
}

// Button component with type safety
export const Button  = ({ label, background, textColor, onClick }:ButtonProps) => {
  return (
    <hstack width="260px" height="60px" alignment="middle center">
      <zstack alignment="start top">
        {/* Shadow */}
        <vstack width="100%" height="100%">
          <spacer height="4px" />
          <hstack width="100%" height="100%">
            <spacer width="4px" />
            <hstack height="50px" width="250px" backgroundColor="black" cornerRadius="full" />
          </hstack>
        </vstack>
        <hstack
          width="250px"
          height="50px"
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
