import React from 'react'
import {Link, Typography} from "@material-ui/core";

const Footer: React.FC<{}> = () => {
  return (
    <div>
      <Typography>
        <Link
          href="https://github.com/lidangzzz/hedgehog-lab"
          // variant="title"
        >
          {
            'Fork this repository at Github: https://github.com/lidangzzz/hedgehog-lab"'
          }
        </Link>

        <br />

        <Link
          href="https://twitter.com/lidangzzz"
          // variant="title"
        >
          {'Follow my Twitter: @lidangzzz'}
        </Link>
      </Typography>
    </div>
  )
}

export default Footer
