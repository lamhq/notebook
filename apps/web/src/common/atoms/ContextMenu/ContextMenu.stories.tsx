import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { type MouseEvent, useState } from 'react';
import { ItemIcon, ItemText, Menu, MenuItem } from './ContextMenu';

const meta = {
  component: Menu,
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
  },
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Button color="primary" variant="contained" onClick={handleClick}>
          Open Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <ItemIcon>
              <BorderColorIcon fontSize="small" />
            </ItemIcon>
            <ItemText primary="Update" />
          </MenuItem>
          <MenuItem>
            <ItemIcon>
              <DeleteIcon fontSize="small" />
            </ItemIcon>
            <ItemText primary="Delete" />
          </MenuItem>
        </Menu>
      </>
    );
  },
};
