# modal-popup

## Prérequis

- Node.js ≥ 18
- Éditeur recommandé : [Visual Studio Code](https://code.visualstudio.com/)
- Dépendances :
  - react ^18.0.0
  - react-dom ^18.0.0
  - @radix-ui/react-dialog ^1.0.0

## Installation

```bash
npm install modal-popup
# installer les peerDependencies
npm install react react-dom @radix-ui/react-dialog
```

## Utilisation

```tsx
import Modal from 'modal-popup'

function App() {
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
```

### Props

- `firstName` et `lastName` (facultatifs) : affichent le nom complet dans le contenu. Si l'un des deux manque, la modale ne s'affiche pas.

## Page du paquet

[https://www.npmjs.com/package/modal-popup](https://www.npmjs.com/package/modal-popup)

