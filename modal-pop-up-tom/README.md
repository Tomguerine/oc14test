# modal-popup

## Prérequis

- Node.js ≥ 18
- Éditeur recommandé : [Visual Studio Code](https://code.visualstudio.com/)

## Installation

```bash
npm install modal-popup
```

## Utilisation

```tsx
import { useState } from 'react'
import Modal from 'modal-popup'

// Utilisation non contrôlée (ouverture gérée en interne)
function UncontrolledExample() {
  return (
    <Modal
      trigger={<button>Ouvrir</button>}
      title="Titre de la modale"
      firstName="Jean"
      lastName="Dupont"
    >
      Contenu de la modale
    </Modal>
  )
}

// Utilisation contrôlée
function ControlledExample() {
  const [open, setOpen] = useState(false)
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<button>Ouvrir</button>}
      title="Titre de la modale"
      firstName="Jean"
      lastName="Dupont"
    >
      Contenu de la modale
    </Modal>
  )
}
```

### Props

- `firstName` et `lastName` (facultatifs) : affichent le nom complet dans le contenu. Si l'un des deux manque, la modale ne s'affiche pas.
- Le déclencheur (`trigger`) est toujours visible même lorsque la boîte de dialogue est fermée.

## Page du paquet

[https://www.npmjs.com/package/modal-popup](https://www.npmjs.com/package/modal-popup)

