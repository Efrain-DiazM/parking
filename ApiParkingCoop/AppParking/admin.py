from django.contrib import admin

from .models import Parqueadero, Usuario, Tarifa, Propietario, Vehiculo, EntradaSalida

# Register your models here.
admin.site.register(Parqueadero)
admin.site.register(Usuario)
admin.site.register(Tarifa)
admin.site.register(Propietario)
admin.site.register(Vehiculo)
admin.site.register(EntradaSalida)

