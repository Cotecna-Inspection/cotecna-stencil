import { Component, h } from '@stencil/core'


@Component({
  tag: 'styled-component',
  styleUrl: '../../tailwind.css'
})
export class StyledComponent {
  render() {
    return (
      // <StyledHost>
        <div class="p-6 rounded-md flex justify-center">
            <h1 class="text-white font-sans">This is a Stencil component using Tailwind</h1>
        </div>
      // </StyledHost>
    )
  }
}