import { Panel, PanelProps } from "./panel";
import { Meta, Story } from "@storybook/react";

// for demo purposes
import { Card } from "../card/card";

export default {
  title: "Components/Panel",
  component: Panel,
  argTypes: {},
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  args: {
    heading: "This is the panel title",
  }
} as Meta;

const Template: Story<PanelProps> = (args) => <Panel {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  children: "This is a simple child."
}

export const GridPanel = Template.bind({});
GridPanel.args = {
  children: [
    <Card title="Imported card" children="This is a test." />,
    <Card title="Imported card" children="This is a test." />,
    <Card title="Imported card" children="This is a test." />,
    <Card title="Imported card" children="This is a test." />,
    <Card title="Imported card" children="This is a test." />
  ]
}