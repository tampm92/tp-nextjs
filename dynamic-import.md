# dynamic-import - NEXT JS

> How resolve: Expected server HTML to contain a matching `<div>` in `<div>`
> When the module includes a library that only works in the browser (not working on server-side)

## Referents

- [NextJS](https://nextjs.org)
- [NextJS dynamic-import](https://nextjs.org/docs/advanced-features/dynamic-import)
- [TP NextJS](https://tampm.com/blog/next-js/)

## Example

> You need setup [`@ant-design/charts`](https://charts.ant.design/) on you project

Codes:

```jsx
import { Line } from '@ant-design/charts'

const ChartsPage = () => {
  const data = [
    { year: '1991', value1: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ]
  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  }
  return <Line {...config} />
}

export default ChartsPage
```

- Problem

When run this codes, you will see error: `Expected server HTML to contain a matching <div> in <div>`

Because this lib is only supposed to run in the browser.

- Solution

To resolve it, you need use `import JavaScript modules dynamically` by [`next/dynamic`](https://nextjs.org/docs/advanced-features/dynamic-import)

Update codes:

```jsx
import dynamic from 'next/dynamic'
const Line = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Line),
  { ssr: false }
)

const ChartsPage = () => {
  const data = [
    { year: '1991', value1: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ]
  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  }
  return <Line {...config} />
}

export default ChartsPage
```

> To can understand more than, please see this [docs](https://nextjs.org/docs/advanced-features/dynamic-import)