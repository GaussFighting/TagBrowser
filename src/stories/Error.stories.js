import Error from "../components/Error";

export default {
  title: "Error",
  component: Error,
};

export const Primary = {
  args: {
    primary: true,
    label: "Error",
  },
};

export const Secondary = {
    args: {
      label: 'Error',
    },
  };

  export const Large = {
    args: {
      size: 'large',
      label: 'Error',
    },
  };
  
  export const Small = {
    args: {
      size: 'small',
      label: 'Error',
    },
  };