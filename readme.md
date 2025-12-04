

### Opérations CRUD

#### POST
Créer une entreprise : POST '/enterprise'
Créer une activité : POST '/activité'
Créer un établissement : POST '/establishment'
Créer une dénomination : POST '/denomination'

Remplir les données dans le body de la requête.
Dans le cas de la création d'une entreprise, il est possible (et nécessaire, dans le cas d'une activité) d'intégrer immédiatement les données de la première activité, du premier établissement et de la première dénomination dans le body.

### GET

Chercher une entreprise par son ID : GET '/enterprise/:id' (où id est le numéro de l'entreprise)
Chercher une entreprise par son nom : GET '/enterprise' avec un body de la forme {"search":[élément à rechercher]}
Chercher les établissements d'une entreprise : Get '/establishment/:id' (où id est le numéro de l'entreprise)

### PUT

Éditer une entreprise : PUT '/enterprise:id' (où id est le numéro de l'entreprise)
Éditer une activité : PUT '/activity:id' (où id est l'id de l'activité)
Éditer un établissement : PUT '/establishment:id' (où id est le numéro de l'établissement)
Éditer une dénomination : PUT '/denomination:id' (où id est l'id de la dénomination)

Remplir les données dans le body de la requête.

### DELETE

Supprimer une entreprise : DELETE '/enterprise:id' (où id est le numéro de l'entreprise) Ceci supprimera également toutes les activités et établissements reliés à l'entreprise.
Supprimer une activité : DELETE '/activity:id' (où id est l'id de l'activité)
Supprimer un établissement : DELETE '/establishment:id' (où id est le numéro de l'établissement)
Supprimer une dénomination : DELETE '/denomination:id' (où id est l'id de la dénomination)